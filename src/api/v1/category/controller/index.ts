import ICategoryService from './../../../../services/interface/category.service';
import { RetrieveCategoryDto } from './../../../../database/dto';
import Paging from '../../../../common/paging';

class CategoryController {
  private _CategoryService: ICategoryService;

  constructor(celebService: ICategoryService) {
    this._CategoryService = celebService;
  }

  /**
   * Get All Category Data For Admin Panel
   *
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Paging<RetrieveCelebDetailDto>>}
   * @memberof CategoryController
   */
  async getAll(page: number, limit: number): Promise<Paging<RetrieveCategoryDto>> {
    try {
      const response = new Paging<RetrieveCategoryDto>();

      const entities = await this._CategoryService.getAllWithPagination(page, limit);

      response.entries = entities.entries.map((entry) => new RetrieveCategoryDto(entry));
      response.total = entities.total;

      return response;
    } catch (e) {
      throw e;
    }
  }
}
export default CategoryController;
