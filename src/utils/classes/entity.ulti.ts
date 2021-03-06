import { Rating, ExplorerCelebrity } from '../../database/entities';
import RetrieveCelebForExplorerDto from '../../database/dto/celeb/retrieveCelebForExplorer.dto';
import { plainToClass } from 'class-transformer';
import { ExplorerCategory } from '../../database/entities/explorer_category.entity';
import RetrieveCategoryForExplorerDto from '../../database/dto/category/retrieveCategoryForExplorer.dto';

class EntityUlti {
  static getAverageRating(array: Rating[]): number {
    if (!array) return 5;
    if (!array.length) return 5;

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i].point;
    }
    const avg = sum / array.length;

    return Math.round(avg * 100) / 100;
  }

  static convertCelebEntityToCelebExplorerDto(array: ExplorerCelebrity[]): RetrieveCelebForExplorerDto[] {
    if (!array) return [];
    if (!array.length) return [];

    const result = [];
    for (let i = 0; i < array.length; i++) {
      const explorerCelebrity = array[i];
      const { celeb, celebId, order } = explorerCelebrity;

      if (celeb) {
        const dto = plainToClass(RetrieveCelebForExplorerDto, celeb);
        dto.order = order;

        result.push(dto);
      } else {
        result.push(plainToClass(RetrieveCelebForExplorerDto, { id: celebId, order }));
      }
    }

    return result;
  }

  static convertCategoryEntityToCategoryExplorerDto(array: ExplorerCategory[]): RetrieveCategoryForExplorerDto[] {
    if (!array) return [];
    if (!array.length) return [];

    const result = [];
    for (let i = 0; i < array.length; i++) {
      const explorerCategory = array[i];
      const { category, categoryId, order } = explorerCategory;

      if (category) {
        const dto = plainToClass(RetrieveCategoryForExplorerDto, category);
        dto.order = order;

        result.push(dto);
      } else {
        result.push(plainToClass(RetrieveCategoryForExplorerDto, { id: categoryId, order }));
      }
    }

    return result;
  }
}
export default EntityUlti;
