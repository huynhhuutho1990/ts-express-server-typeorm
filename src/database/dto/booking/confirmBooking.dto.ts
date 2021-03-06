import BaseEntityDto from '../baseEntity.dto';
import { Request } from '../../entities';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     ConfirmBookingDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         request_number:
 *           type: string
 *           format: email
 *         receipt:
 *           type: string
 *         purchase_id:
 *           type: string
 *       required:
 *         - request_number
 *         - receipt
 *         - purchase_id
 */
export default class ConfirmBookingDto extends BaseEntityDto<Request> {
  @IsString()
  @IsNotEmpty()
  public request_number: string;

  @IsBoolean()
  // @Transform(stringToBool)
  public direct_payment: boolean;

  @IsString()
  @IsOptional()
  public receipt?: string;

  @IsString()
  @IsOptional()
  public purchase_id?: string;

  protected getEntityClass(): new () => Request {
    return Request;
  }
}
