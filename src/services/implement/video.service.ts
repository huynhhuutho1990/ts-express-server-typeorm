import BaseService from './base.service';
import { Video } from '../../database/entities/video.entity';
import IVideoService from '../interface/video.service';
import { DEFAULT_PAGE_SIZE } from '../../config';
import Paging from '../../common/paging';
import { isValidV4UUID } from '../../utils/helpers/utility.helper';

export default class VideoService extends BaseService<Video> implements IVideoService {
  protected getEntityClass(): new () => Video {
    return Video;
  }

  async getVideoByCeleb(celebId: string, page: number, perPage: number = DEFAULT_PAGE_SIZE): Promise<Paging<Video>> {
    const result = await this.repository.findAndCount({
      where: { celeb_id: celebId },
      take: perPage,
      skip: page * perPage
    });

    return new Paging(result[0], result[1]);
  }

  async getVideoByUser(userId: string, page: number, perPage: number = DEFAULT_PAGE_SIZE): Promise<Paging<Video>> {
    const result = await this.repository.findAndCount({
      where: { user_id: userId },
      relations: ['celeb', 'celeb.categories', 'request', 'request.pronoun', 'request.occasion'],
      order: {
        created_at: 'DESC'
      },
      take: perPage,
      skip: page * perPage
    });

    return new Paging(result[0], result[1]);
  }

  getVideoByRequestId(requestId: string): Promise<Video> {
    return this.repository.findOne({ request_id: requestId });
  }

  getRecentVideoByCeleb(celebId: string, take: number): Promise<Video[]> {
    return this.repository.find({
      where: {
        celeb_id: celebId
      },
      take
    });
  }

  getVideoByIdOrSlugUrl(identifier: string): Promise<Video> {
    const condition = isValidV4UUID(identifier) ? { id: identifier } : { slug_url: identifier };

    return this.repository.findOne({
      relations: ['celeb', 'celeb.categories', 'request', 'request.pronoun', 'request.occasion'],
      where: condition
    });
  }

  async isExitsSlugUrl(slug_url: string): Promise<boolean> {
    const result = await this.repository.findOne({ slug_url: slug_url });
    return !!result;
  }
}
