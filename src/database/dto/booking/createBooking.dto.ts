import BaseEntityDto from '../baseEntity.dto';
import { Request } from '../../entities';
import { IsString, IsNotEmpty, IsUUID, IsEmail, IsOptional, IsNumberString } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateBookingDto:
 *       type: object
 *       properties:
 *         receiver_name:
 *           type: string
 *         buyer_email:
 *           type: string
 *           format: email
 *         buyer_phone:
 *           type: string
 *         instruction:
 *           type: string
 *         celeb_id:
 *           type: string
 *         pronoun_id:
 *           type: string
 *         occasion_id:
 *           type: string
 *       required:
 *         - receiver_name
 *         - instruction
 *         - celeb_id
 *         - pronoun_id
 *         - occasion_id
 */
export default class CreateBookingDto extends BaseEntityDto<Request> {
  @IsString()
  @IsNotEmpty()
  public receiver_name: string;

  @IsEmail()
  @IsOptional()
  public buyer_email?: string;

  @IsNumberString()
  @IsOptional()
  public buyer_phone?: string;

  @IsString()
  @IsNotEmpty()
  public instruction: string;

  @IsUUID()
  @IsNotEmpty()
  public celeb_id: string;

  @IsUUID()
  @IsNotEmpty()
  public pronoun_id: string;

  @IsUUID()
  @IsNotEmpty()
  public occasion_id: string;

  protected getEntityClass(): new () => Request {
    return Request;
  }
}
