import Paging from '../../common/paging';
import { ObjectID, FindConditions } from 'typeorm';

export default interface IBaseService<T> {
  getOne(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  getByPage(page: number, perPage: number): Promise<Paging<T>>;
  save(entity: T): Promise<T>;
  saveMany(entities: T[]): Promise<T[]>;
  remove(entity: T): Promise<boolean>;
  removeAll(entity: T[]): Promise<T[]>;
  update(criteria: any, updatedFields: any): Promise<boolean>;
  delete(entity: T): Promise<boolean>;
  deleteAll(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>
  ): Promise<number>;
}
