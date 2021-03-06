import IBaseService from './base.service';
import { HomeCeleb } from '../../database/entities/home_celeb.entity';
import Paging from '../../common/paging';

export default interface IHomeCelebService extends IBaseService<HomeCeleb> {
  getAndOrder(page: number, perPage?: number): Promise<Paging<HomeCeleb>>;

  saveHomepage(homeCelebs: HomeCeleb[]): Promise<HomeCeleb[]>;
}
