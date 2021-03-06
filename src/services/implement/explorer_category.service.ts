import BaseService from './base.service';
import { ExplorerCategory } from '../../database/entities/explorer_category.entity';
import IExplorerCategoryService from '../interface/explorer_category.service';
import { FindManyOptions } from 'typeorm';

export default class ExplorerCategoryService extends BaseService<ExplorerCategory> implements IExplorerCategoryService {
  protected getEntityClass(): new () => ExplorerCategory {
    return ExplorerCategory;
  }

  findAllByGroupId(groupId: string): Promise<ExplorerCategory[]> {
    const options: FindManyOptions<ExplorerCategory> = {
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

  private findWithConditions(options: FindManyOptions): Promise<ExplorerCategory[]> {
    return this.repository.find(options);
  }
}
