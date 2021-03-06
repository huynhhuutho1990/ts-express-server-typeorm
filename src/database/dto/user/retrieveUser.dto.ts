import { Exclude, Expose } from 'class-transformer';
import BaseRetrieveDto from '../baseRetrieve.dto';
import { User } from '../../entities';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveUserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         user_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone_number:
 *           type: string
 *         photo:
 *           type: string
 */
@Exclude()
export default class RetrieveUserDto extends BaseRetrieveDto<User> {
  @Expose()
  public name: string;

  @Expose()
  public user_name?: string;

  @Expose()
  public email?: string;

  // @Expose()
  // public phone_number?: string;

  @Expose()
  public photo?: string;

  protected getCurrentClass(): new () => BaseRetrieveDto<User> {
    return RetrieveUserDto;
  }
  protected getEntityClass(): new () => User {
    return User;
  }
}
