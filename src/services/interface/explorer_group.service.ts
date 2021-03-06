import IBaseService from './base.service';
import { ExplorerGroup } from '../../database/entities';
import { DeleteResult } from 'typeorm';

export default interface IExplorerGroupService extends IBaseService<ExplorerGroup> {
  removeById(id: string): Promise<DeleteResult>;
  removeAllWithIdNotInArray(ids: string[]): Promise<boolean>;
  getAllExplorerGroups(): Promise<ExplorerGroup[]>;
}
