import IBaseService from './base.service';
import { Category } from '../../database/entities/category.entity';
import Paging from '../../common/paging';

export default interface ICategoryService extends IBaseService<Category> {
  getAllWithPagination(page: number, perPage?: number, relations?: string[]): Promise<Paging<Category>>;
}
