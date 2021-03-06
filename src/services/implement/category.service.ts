import BaseService from './base.service';
import { Category } from '../../database/entities/category.entity';
import ICategoryService from '../interface/category.service';
import { In } from 'typeorm';
import Paging from '../../common/paging';
import { DEFAULT_PAGE_SIZE } from '../../config';

export default class CategoryService extends BaseService<Category> implements ICategoryService {
  protected getEntityClass(): new () => Category {
    return Category;
  }

  async getAllWithPagination(
    page: number,
    perPage: number = DEFAULT_PAGE_SIZE,
    relations?: string[]
  ): Promise<Paging<Category>> {
    const result = await this.repository.findAndCount({ take: perPage, skip: page * perPage, relations });

    return new Paging(result[0], result[1]);
  }

  async getByExternalId(external_id: string, withDeleted = false): Promise<Category> {
    return this.repository.findOne({ external_id }, { withDeleted: withDeleted });
  }

  async getByExternalIds(external_ids: string[], withDeleted = false): Promise<Category[]> {
    return this.repository.find({
      where: [{ external_id: In(external_ids) }],
      withDeleted: withDeleted
    });
  }
}
