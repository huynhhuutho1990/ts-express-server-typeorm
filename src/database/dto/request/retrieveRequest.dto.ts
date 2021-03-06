import BaseRetrieveDto from '../baseRetrieve.dto';
import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { Request } from '../../entities';
import { PAYMENT_STATUS_TYPE, REQUEST_STATUS_TYPE } from '../../../utils/constants';
import { RetrieveCelebDto, RetrieveOccasionDto, RetrievePronounDto, RetrieveVideoDto, RetrieveUserDto } from '..';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveRequestDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         receiver_name:
 *           type: string
 *         introduction:
 *           type: string
 *         instruction:
 *           type: string
 *         buyer_email:
 *           type: string
 *           format: email
 *         buyer_phone:
 *           type: string
 *         request_number:
 *           type: string
 *         payment_status:
 *           type: string
 *           enum: [Pending, Paid, Fail, Refunded]
 *         payment_status_code:
 *           type: number
 *         price:
 *           type: number
 *         display_price:
 *           type: number
 *         status:
 *           $ref: '#/components/schemas/RequestStatusObject'
 *         celeb:
 *           $ref: '#/components/schemas/RetrieveCelebDto'
 *         occasion:
 *           $ref: '#/components/schemas/RetrieveOccasionDto'
 *         pronoun:
 *           $ref: '#/components/schemas/RetrievePronounDto'
 *         video:
 *           $ref: '#/components/schemas/RetrieveVideoDto'
 *         user:
 *           $ref: '#/components/schemas/RetrieveUserDto'
 *
 *     RequestStatusObject:
 *       type: object
 *       properties:
 *         icon:
 *           type: string
 *         text:
 *           type: string
 *         color:
 *           type: string
 */
@Exclude()
export default class RetrieveRequestDto extends BaseRetrieveDto<Request> {
  @Expose()
  public receiver_name: string;

  @Expose()
  public introduction: string;

  @Expose()
  public instruction: string;

  @Expose()
  public buyer_email: string;

  @Expose()
  public buyer_phone: string;

  @Expose()
  public request_number: string;

  @Expose()
  public payment_status: PAYMENT_STATUS_TYPE;

  @Expose()
  @Transform((val, obj) => {
    switch (obj.payment_status) {
      case PAYMENT_STATUS_TYPE.FAIL:
        return 0;
      case PAYMENT_STATUS_TYPE.PAID:
        return 1;
      case PAYMENT_STATUS_TYPE.PENDING:
        return 2;
      case PAYMENT_STATUS_TYPE.REFUNDED:
        return 3;
      default:
        return 0;
    }
  })
  public payment_status_code: number;

  @Expose()
  @Transform((val) => parseFloat(val))
  public price: number;

  @Expose()
  @Transform((val) => parseFloat(val))
  public display_price: number;

  @Expose()
  @Transform((status: REQUEST_STATUS_TYPE) => {
    switch (status) {
      case REQUEST_STATUS_TYPE.REJECTED:
        return {
          icon: 'error-icon.png',
          text: 'Rejected',
          color: '#EB345C'
        };
      case REQUEST_STATUS_TYPE.COMPLETED:
        return {
          icon: 'done-icon.png',
          text: 'Done',
          color: '#2C78F6'
        };
      default:
        return {
          icon:
            'pending-icon.png',
          text: 'Processing',
          color: '#9830F5'
        };
    }
  })
  public status: { icon: string; text: string; color: string };

  @Expose()
  @Type(() => RetrieveCelebDto)
  public celeb: RetrieveCelebDto;

  @Expose()
  @Type(() => RetrieveOccasionDto)
  public occasion: RetrieveOccasionDto;

  @Expose()
  @Type(() => RetrievePronounDto)
  public pronoun: RetrievePronounDto;

  @Expose()
  @Type(() => RetrieveVideoDto)
  public video: RetrieveVideoDto;

  @Expose()
  @Type(() => RetrieveUserDto)
  public user: RetrieveUserDto;

  protected getCurrentClass(): new () => BaseRetrieveDto<Request> {
    return RetrieveRequestDto;
  }
  protected getEntityClass(): new () => Request {
    return Request;
  }
}
