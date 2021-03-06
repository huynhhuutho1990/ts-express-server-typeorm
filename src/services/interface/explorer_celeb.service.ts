import IBaseService from './base.service';
import { ExplorerCelebrity } from '../../database/entities/explorer_celeb.entity';

export default interface IExplorerCelebrityService extends IBaseService<ExplorerCelebrity> {
  findAllByGroupId(groupId: string): Promise<ExplorerCelebrity[]>;
  removeAllNullGroupId(): Promise<boolean>;
}
