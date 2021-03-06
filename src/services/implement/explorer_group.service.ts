import BaseService from './base.service';
import { ExplorerGroup } from '../../database/entities';
import IExplorerGroupService from '../interface/explorer_group.service';
import { DeleteResult, Not, In, FindConditions, FindManyOptions } from 'typeorm';

export default class ExplorerGroupService extends BaseService<ExplorerGroup> implements IExplorerGroupService {
  protected getEntityClass(): new () => ExplorerGroup {
    return ExplorerGroup;
  }

  removeById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async removeAllWithIdNotInArray(ids: string[]): Promise<boolean> {
    const options: FindConditions<ExplorerGroup> = {
      id: Not(In(ids))
    };

    const result = await this.repository.delete(options);
    return result !== null;
  }

  getAllExplorerGroups(): Promise<ExplorerGroup[]> {
    const options: FindManyOptions<ExplorerGroup> = {
      relations: [
        'explorerCelebs',
        'explorerCelebs.celeb',
        'explorerCelebs.celeb.categories',
        'explorerCelebs.celeb.store_price_product',
        'explorerCategories',
        'explorerCategories.category'
      ],
      order: {
        order: 'ASC'
      }
    };

    return this.repository.find(options);
  }
}
