import { Exclude, Expose, Transform } from 'class-transformer';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveStorePriceProductDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         product_id:
 *           type: string
 *         price:
 *           type: number
 *         display_price:
 *           type: number
 *         currency:
 *           type: string
 */
@Exclude()
export default class RetrieveStorePriceProductDto {
  @Expose()
  public name: string;

  @Expose()
  public product_id: string;

  @Expose()
  @Transform((value) => parseFloat(value), { toClassOnly: true })
  public price: number;

  @Expose()
  @Transform((value) => parseFloat(value), { toClassOnly: true })
  public display_price: number;

  @Expose()
  @Transform((value) => value || 'đ', { toClassOnly: true })
  public currency: string;
}
