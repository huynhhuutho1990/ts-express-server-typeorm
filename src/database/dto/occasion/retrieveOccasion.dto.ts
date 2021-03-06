import BaseRetrieveDto from '../baseRetrieve.dto';
import { Occasion } from '../../entities';
import { Exclude, Expose } from 'class-transformer';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveOccasionDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         icon:
 *           type: string
 */
@Exclude()
export default class RetrieveOccasionDto extends BaseRetrieveDto<Occasion> {
  @Expose()
  public name: string;

  @Expose()
  public icon: string;

  protected getCurrentClass(): new () => BaseRetrieveDto<Occasion> {
    return RetrieveOccasionDto;
  }
  protected getEntityClass(): new () => Occasion {
    return Occasion;
  }
}
