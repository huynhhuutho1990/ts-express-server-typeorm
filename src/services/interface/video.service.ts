import IBaseService from './base.service';
import { Video } from '../../database/entities/video.entity';
import Paging from '../../common/paging';

export default interface IVideoService extends IBaseService<Video> {
  getVideoByCeleb(celebId: string, page: number, perPage?: number): Promise<Paging<Video>>;
  getVideoByUser(userId: string, page: number, perPage?: number): Promise<Paging<Video>>;
  getRecentVideoByCeleb(celebId: string, take: number): Promise<Video[]>;
  getVideoByIdOrSlugUrl(identifier: string): Promise<Video>;
  getVideoByRequestId(requestId: string): Promise<Video>;
}
