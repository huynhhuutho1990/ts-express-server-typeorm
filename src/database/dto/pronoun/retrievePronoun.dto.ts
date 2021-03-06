import BaseRetrieveDto from '../baseRetrieve.dto';
import { Pronoun } from '../../entities';
import { Expose, Exclude } from 'class-transformer';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrievePronounDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */
@Exclude()
export default class RetrievePronounDto extends BaseRetrieveDto<Pronoun> {
  @Expose()
  public name: string;

  protected getCurrentClass(): new () => BaseRetrieveDto<Pronoun> {
    return RetrievePronounDto;
  }
  protected getEntityClass(): new () => Pronoun {
    return Pronoun;
  }
}
