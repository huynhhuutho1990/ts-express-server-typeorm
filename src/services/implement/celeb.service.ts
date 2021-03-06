import { In } from 'typeorm';

import BaseService from './base.service';
import { Celeb } from '../../database/entities/celeb.entity';
import ICelebService from '../interface/celeb.service';
import Paging from '../../common/paging';
import { DEFAULT_PAGE_SIZE } from '../../config';
import { Category } from '../../database/entities';
import { isValidV4UUID } from '../../utils/helpers/utility.helper';

export default class CelebService extends BaseService<Celeb> implements ICelebService {
  protected getEntityClass(): new () => Celeb {
    return Celeb;
  }

  async getById(id: string, relations?: string[]): Promise<Celeb> {
    return await this.repository.findOne({ id }, { relations: relations });
  }

  getByIdOrSlugId(identifier: string, relations?: string[]): Promise<Celeb> {
    const condition = isValidV4UUID(identifier) ? { id: identifier } : { slug_url: identifier };

    return this.repository.findOne(condition, { relations: relations });
  }

  async getByExternalId(external_id: string, withDeleted = false): Promise<Celeb> {
    return await this.repository.findOne(
      { external_id },
      { withDeleted: withDeleted, relations: ['categories', 'socials', 'medias', 'store_price_product'] }
    );
  }

  async searchForCeleb(query: string, page: number, perPage: number = DEFAULT_PAGE_SIZE): Promise<Paging<Celeb>> {
    const result = await this.repository
      .createQueryBuilder('celeb')
      .select('celeb')
      .leftJoinAndSelect('celeb.categories', 'category')
      .leftJoinAndSelect('celeb.store_price_product', 'price')
      .where('unaccent(celeb.name) ILIKE unaccent(:query)', { query: `%${query}%` })
      .take(perPage)
      .skip(page * perPage)
      .getManyAndCount();

    return new Paging(result[0], result[1]);
  }

  async getCelebByCategory(catId: string, page: number, perPage: number = DEFAULT_PAGE_SIZE): Promise<Paging<Celeb>> {
    const result = await this.repository
      .createQueryBuilder('celeb')
      .select('celeb')
      .leftJoinAndSelect('celeb.categories', 'category')
      .leftJoinAndSelect('celeb.store_price_product', 'price')
      .where('category.id = :catId', { catId })
      .take(perPage)
      .skip(page * perPage)
      .getManyAndCount();

    return new Paging(result[0], result[1]);
  }

  async getAllWithPagination(
    page: number,
    perPage: number = DEFAULT_PAGE_SIZE,
    relations?: string[]
  ): Promise<Paging<Celeb>> {
    const result = await this.repository.findAndCount({ take: perPage, skip: page * perPage, relations });

    return new Paging(result[0], result[1]);
  }

  getRandomCelebByCategory(
    categories: Category[],
    exceptionIds?: string[],
    take = 5,
    noRandom?: boolean
  ): Promise<Celeb[]> {
    const query = this.repository
      .createQueryBuilder('celeb')
      .select('celeb')
      .leftJoinAndSelect('celeb.categories', 'category')
      .leftJoinAndSelect('celeb.store_price_product', 'price')
      .where('category.id IN (:...categories)', { categories: categories.map((val) => val.id) })
      .andWhere(!noRandom ? 'random() < 0.8' : '1 = 1')
      .take(take);

    if (exceptionIds && exceptionIds.length) {
      query.andWhere('celeb.id NOT IN (:...exceptionIds)', { exceptionIds });
    }

    return query.getMany();
  }

  getCelebsWithCategoryAndMedia(ids: string[]): Promise<Celeb[]> {
    return this.repository.find({
      where: {
        id: In(ids)
      },
      relations: ['categories', 'medias', 'store_price_product']
    });
  }

  async checkSlugUrl(slug_url: string): Promise<boolean> {
    const found = await this.repository.findOne({ slug_url });
    return !!found;
  }

  getAllWithCategory(): Promise<Celeb[]> {
    // return this.repository.find({ relations: ['categories'], loadEagerRelations: true });
    return this.repository
      .createQueryBuilder('celeb')
      .leftJoinAndSelect('celeb.categories', 'category', 'category.deleted_at is null')
      .getMany();
  }

  async getByExternalIds(external_ids: string[], withDeleted = false): Promise<Celeb[]> {
    return this.repository.find({
      where: [{ external_id: In(external_ids) }],
      withDeleted: withDeleted
    });
  }
}
