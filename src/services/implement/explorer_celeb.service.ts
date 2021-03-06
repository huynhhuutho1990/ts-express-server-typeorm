import BaseService from './base.service';
import { ExplorerCelebrity } from '../../database/entities/explorer_celeb.entity';
import IExplorerCelebrityService from '../interface/explorer_celeb.service';
import { FindManyOptions } from 'typeorm';

export default class ExplorerCelebrityService
  extends BaseService<ExplorerCelebrity>
  implements IExplorerCelebrityService {
  protected getEntityClass(): new () => ExplorerCelebrity {
    return ExplorerCelebrity;
  }

  findAllByGroupId(groupId: string): Promise<ExplorerCelebrity[]> {
    const options: FindManyOptions<ExplorerCelebrity> = {
      relations: ['celeb'],
      where: {
        groupId
      },
      order: {
        order: 'ASC'
      }
    };

    return this.findWithConditions(options);
  }

  async removeAllNullGroupId(): Promise<boolean> {
    const result = await this.repository.createQueryBuilder().delete().where('group_id is null').execute();

    return result !== null;
  }

  private findWithConditions(options: FindManyOptions): Promise<ExplorerCelebrity[]> {
    return this.repository.find(options);
  }
}
