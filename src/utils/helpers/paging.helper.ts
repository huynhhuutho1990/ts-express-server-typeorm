import Paging from '../../common/paging';
import { BaseEntity } from '../../database/entities/base';
import BaseRetrieveDto from '../../database/dto/baseRetrieve.dto';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export function convertToDtoPage<T extends BaseRetrieveDto<E>, E extends BaseEntity>(
  paging: Paging<E>,
  dtoClass: ClassType<T>
): Paging<T> {
  return new Paging(plainToClass(dtoClass, paging.entries), paging.total);
}
