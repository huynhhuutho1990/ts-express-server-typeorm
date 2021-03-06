import { Exclude, Expose, Type } from 'class-transformer';
import { RetrieveCelebDto, RetrieveOccasionDto, RetrievePronounDto } from '..';

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingDetailDto:
 *       type: object
 *       properties:
 *         celeb:
 *           $ref: '#/components/schemas/RetrieveCelebDto'
 *         occasions:
 *           $ref: '#/components/schemas/RetrieveOccasionDto'
 *         pronouns:
 *           $ref: '#/components/schemas/RetrievePronounDto'
 */
@Exclude()
export default class BookingDetailDto {
  @Expose()
  @Type(() => RetrieveCelebDto)
  public celeb: RetrieveCelebDto;

  @Expose()
  @Type(() => RetrieveOccasionDto)
  public occasions: RetrieveOccasionDto[];

  @Expose()
  @Type(() => RetrievePronounDto)
  public pronouns: RetrievePronounDto[];
}
