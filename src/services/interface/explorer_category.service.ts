import IBaseService from './base.service';
import { ExplorerCategory } from '../../database/entities/explorer_category.entity';

export default interface IExplorerCategoryService extends IBaseService<ExplorerCategory> {
  findAllByGroupId(groupId: string): Promise<ExplorerCategory[]>;
  removeAllNullGroupId(): Promise<boolean>;
}
