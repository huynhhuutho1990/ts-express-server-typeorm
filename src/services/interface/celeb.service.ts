import IBaseService from './base.service';
import { Celeb } from '../../database/entities/celeb.entity';
import Paging from '../../common/paging';
import { Category } from '../../database/entities';

export default interface ICelebService extends IBaseService<Celeb> {
  getById(id: string, relations?: string[]): Promise<Celeb>;

  getByIdOrSlugId(identifier: string, relations?: string[]): Promise<Celeb>;

  getByExternalId(external_id: string, withDeleted: boolean): Promise<Celeb>;

  searchForCeleb(query: string, page: number, perPage?: number): Promise<Paging<Celeb>>;

  getCelebByCategory(catId: string, page: number, perPage?: number): Promise<Paging<Celeb>>;

  getAllWithPagination(page: number, perPage?: number, relations?: string[]): Promise<Paging<Celeb>>;

  getRandomCelebByCategory(
    categories: Category[],
    exceptionIds: string[],
    take?: number,
    noRandom?: boolean
  ): Promise<Celeb[]>;

  getCelebsWithCategoryAndMedia(ids: string[]): Promise<Celeb[]>;
  getByExternalIds(external_ids: string[], withDeleted: boolean): Promise<Celeb[]>;
}
