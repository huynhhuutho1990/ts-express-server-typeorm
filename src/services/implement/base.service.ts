import IBaseService from '../interface/base.service';
import { Repository, getConnection, ObjectID, FindConditions } from 'typeorm';
import Paging from '../../common/paging';
import { DEFAULT_PAGE_SIZE } from '../../config/app.config';

export default abstract class BaseService<T> implements IBaseService<T> {
  protected get repository(): Repository<T> {
    return getConnection().getRepository(this.getEntityClass());
  }

  protected abstract getEntityClass(): new () => T;

  // public _repo = getConnection().getRepository(this.getEntityClass());
  getOne(id: string): Promise<T> {
    return this.repository.findOne(id);
  }

  getAll(): Promise<T[]> {
    return this.repository.find();
  }

  async getByPage(page: number, perPage: number = DEFAULT_PAGE_SIZE): Promise<Paging<T>> {
    const results = await this.repository.findAndCount({
      take: perPage,
      skip: perPage * page
    });
    const pageResult = new Paging(results[0], results[1]);

    return pageResult;
  }

  save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  saveMany(entities: T[]): Promise<T[]> {
    return this.repository.save(entities);
  }

  async remove(entity: T): Promise<boolean> {
    const results = await this.repository.softRemove(entity);
    return results !== null;
  }

  async removeAll(entities: T[]): Promise<T[]> {
    const results = await this.repository.softRemove(entities);
    return results;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async removeAllWithCondition(criteria: any): Promise<number> {
    const results = await this.repository.softDelete(criteria);
    return results.affected;
  }

  async delete(entity: T): Promise<boolean> {
    const results = await this.repository.delete(entity);
    return results !== null;
  }

  async deleteAll(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>
  ): Promise<number> {
    const results = await this.repository.delete(criteria);
    return results.affected;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update(criteria: any, updatedFields: any): Promise<boolean> {
    const result = await this.repository.update(criteria, updatedFields);

    return result.affected > 0;
  }
}
