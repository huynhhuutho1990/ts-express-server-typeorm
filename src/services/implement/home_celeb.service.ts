import BaseService from './base.service';
import { HomeCeleb } from '../../database/entities/home_celeb.entity';
import IHomeCelebService from '../interface/home_celeb.service';
import { DEFAULT_PAGE_SIZE } from '../../config';
import Paging from '../../common/paging';
import { getConnection, Not, In } from 'typeorm';

export default class HomeCelebService extends BaseService<HomeCeleb> implements IHomeCelebService {
  protected getEntityClass(): new () => HomeCeleb {
    return HomeCeleb;
  }

  async getAndOrder(page: number, perPage: number = DEFAULT_PAGE_SIZE): Promise<Paging<HomeCeleb>> {
    const result = await this.repository.findAndCount({
      order: {
        order: 'ASC'
      },
      take: perPage,
      skip: page * perPage
    });

    return new Paging(result[0], result[1]);
  }

  async getAllAndOrder(): Promise<HomeCeleb[]> {
    return this.repository.find({
      relations: ['celeb'],
      order: {
        order: 'ASC'
      }
    });
  }

  async saveHomepage(homeCelebs: HomeCeleb[]): Promise<HomeCeleb[]> {
    await getConnection().transaction(async (transactionEntityManager) => {
      const ids = homeCelebs.map((val) => val.id);
      const promises: Array<Promise<any>> = [];
      // remove all deleted entries
      promises.push(
        transactionEntityManager.delete(HomeCeleb, {
          id: Not(In(ids))
        })
      );
      // save all remaining entries
      promises.push(transactionEntityManager.save(homeCelebs));
      // await those 2 processes and return
      return Promise.all(promises);
    });

    return this.getAllAndOrder();
  }
}
