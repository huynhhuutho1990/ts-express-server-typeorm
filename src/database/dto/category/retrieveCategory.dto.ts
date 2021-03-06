import BaseRetrieveDto from '../baseRetrieve.dto';
import { Category } from '../../entities/category.entity';
import { Exclude, Expose } from 'class-transformer';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveCategoryDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */
@Exclude()
export default class RetrieveCategoryDto extends BaseRetrieveDto<Category> {
  @Expose()
  public name: string;

  protected getCurrentClass(): new () => RetrieveCategoryDto {
    return RetrieveCategoryDto;
  }
  protected getEntityClass(): new () => Category {
    return Category;
  }
}
