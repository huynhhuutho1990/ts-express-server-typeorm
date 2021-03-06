import Paging from '../../../../common/paging';
import {
  RetrieveVideoDto,
  RetrieveRequestDto,
  RetrieveCelebDto,
  RetrieveVideoWithRequestInfoDto
} from '../../../../database/dto';
import IVideoService from '../../../../services/interface/video.service';
import IRequestService from '../../../../services/interface/request.service';
import { Video } from '../../../../database/entities';

class VideoController {
  private _VideoService: IVideoService;
  private _RequestService: IRequestService;

  constructor(videoService: IVideoService, requestService: IRequestService) {
    this._VideoService = videoService;
    this._RequestService = requestService;
  }

  async getVideosByUserId(userId: string, page: number, perPage: number): Promise<Paging<RetrieveRequestDto>> {
    try {
      const response = new Paging<RetrieveRequestDto>();

      const entities = await this._VideoService.getVideoByUser(userId, page, perPage);

      response.entries = entities.entries.map((entry) => this.videoEntityToRequestDto(entry));
      response.total = entities.total;

      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get Video By Request Number
   *
   * @param {string} requestNumber
   * @returns {Promise<RetrieveVideoWithRequestInfoDto>} video info object
   * @memberof VideoController
   */
  async getVideoByRequestNumber(requestNumber: string): Promise<RetrieveVideoWithRequestInfoDto> {
    try {
      const requestEntity = await this._RequestService.getByRequestNumber(requestNumber, [
        'pronoun',
        'occasion',
        'celeb',
        'video'
      ]);
      if (!requestEntity) return null;

      const requestDto = new RetrieveRequestDto(requestEntity);
      const { celeb, video, user } = requestDto;
      if (!video) return null;

      const retrieveVideoDto = new RetrieveVideoWithRequestInfoDto();
      retrieveVideoDto.id = video.id;
      retrieveVideoDto.url = video.url;
      retrieveVideoDto.slug_url = video.slug_url;
      retrieveVideoDto.celeb = celeb;
      retrieveVideoDto.user = user;
      delete requestDto.video;
      delete requestDto.celeb;
      delete requestDto.user;
      retrieveVideoDto.request = requestDto;

      return retrieveVideoDto;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get Video By Id or Slug Url
   *
   * @param {string} `id || slug_url`
   * @returns {Promise<RetrieveRequestDto>} video info object
   * @memberof VideoController
   */
  async getVideoByIdOrSlugUrl(identifier: string): Promise<RetrieveRequestDto> {
    try {
      if (!identifier) return null;
      const videoEntity = await this._VideoService.getVideoByIdOrSlugUrl(identifier);
      if (!videoEntity) return null;

      const dto = this.videoEntityToRequestDto(videoEntity);

      return dto;
    } catch (e) {
      throw e;
    }
  }

  private videoEntityToRequestDto(videoDto: Video) {
    const { id, url, slug_url, celeb, request } = videoDto;
    const dto = new RetrieveRequestDto(request);

    dto.celeb = new RetrieveCelebDto(celeb);
    const video = new RetrieveVideoDto();
    video.id = id;
    video.url = url;
    video.slug_url = slug_url;
    dto.video = video;

    return dto;
  }
}
export default VideoController;
