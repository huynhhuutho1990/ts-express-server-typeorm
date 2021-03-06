import ICelebService from './../../../../services/interface/celeb.service';
import { RetrieveCelebDetailDto } from './../../../../database/dto';
import { QueryFailedError } from 'typeorm';
import { BadRequestError } from '../../../../common/api-error';
import Paging from '../../../../common/paging';

class CelebController {
  private _CelebService: ICelebService;

  constructor(celebService: ICelebService) {
    this._CelebService = celebService;
  }

  /**
   * Get Celeb Info By Id or Slug Url
   *
   * @param {string} `Id or Slug Url`
   * @returns {Promise<RetrieveCelebDetailDto>}
   * @memberof CelebController
   */
  async get(identifier: string): Promise<RetrieveCelebDetailDto> {
    try {
      if (!identifier) return null;
      const celebEntity = await this._CelebService.getByIdOrSlugId(identifier, [
        'medias',
        'categories',
        'ratings',
        'store_price_product'
      ]);
      if (!celebEntity) return null;

      const celebrity = new RetrieveCelebDetailDto(celebEntity);
      if (celebEntity.categories.length) {
        const suggestionCelebs = await this._CelebService.getRandomCelebByCategory(
          celebEntity.categories,
          [celebEntity.id],
          10,
          true
        );
        celebrity.suggestion = suggestionCelebs.map((celebEntity) => new RetrieveCelebDetailDto(celebEntity));
      } else {
        celebrity.suggestion = [];
      }

      return celebrity;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestError('invalid id');
      }

      throw e;
    }
  }

  /**
   * Get All Celeb Data For Admin Panel
   *
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Paging<RetrieveCelebDetailDto>>}
   * @memberof CelebController
   */
  async getAll(page: number, limit: number): Promise<Paging<RetrieveCelebDetailDto>> {
    try {
      const response = new Paging<RetrieveCelebDetailDto>();

      const entities = await this._CelebService.getAllWithPagination(page, limit, [
        'medias',
        'categories',
        'ratings',
        'store_price_product'
      ]);

      response.entries = entities.entries.map((entry) => new RetrieveCelebDetailDto(entry));
      response.total = entities.total;

      return response;
    } catch (e) {
      throw e;
    }
  }
}
export default CelebController;
