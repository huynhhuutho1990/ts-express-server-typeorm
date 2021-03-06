import BaseService from './base.service';
import { Request } from '../../database/entities/request.entity';
import IRequestService from '../interface/request.service';
import { FindOneOptions, QueryFailedError, Not } from 'typeorm';
import generateRequestNumber from '../../utils/helpers/requestNumber.helper';
import { REQUEST_STATUS_TYPE, PAYMENT_STATUS_TYPE } from '../../utils/constants';
import Paging from '../../common/paging';
import { DEFAULT_PAGE_SIZE } from '../../config';

export default class RequestService extends BaseService<Request> implements IRequestService {
  protected getEntityClass(): new () => Request {
    return Request;
  }

  getAllByCelebId(id: string): Promise<Request[]> {
    return this.repository.find({ celeb_id: id });
  }

  getRequestByRequestNumber(request_number: string, relations: string[]): Promise<Request> {
    const options: FindOneOptions<Request> = {
      relations,
      where: { request_number: request_number }
    };

    return this.repository.findOneOrFail(options);
  }

  async create(entity: Request): Promise<Request> {
    entity.status = REQUEST_STATUS_TYPE.INTAKE;
    entity.payment_status = PAYMENT_STATUS_TYPE.PENDING;
    let created = false;
    do {
      try {
        const generatedUUID = generateRequestNumber();
        entity.id = generatedUUID.uuid;
        entity.request_number = generatedUUID.requestNumber;
        entity = await this.save(entity);
        created = true;
      } catch (e) {
        if (queryFailedGuard(e) && e.code === '23505') {
          // duplicated request number, retry
          created = false;
        } else {
          throw e;
        }
      }
    } while (!created);

    return this.repository.findOne(entity.id, {
      relations: ['celeb', 'pronoun', 'occasion']
    });
  }

  getByRequestNumber(requestNumber: string, relations?: string[]): Promise<Request> {
    return this.repository.findOne({
      where: { request_number: requestNumber },
      relations
    });
  }

  async getRequestHistoryByUserId(
    uid: string,
    page: number,
    perPage: number = DEFAULT_PAGE_SIZE
  ): Promise<Paging<Request>> {
    const result = await this.repository.findAndCount({
      where: {
        user_id: uid,
        payment_status: Not(PAYMENT_STATUS_TYPE.PENDING)
      },
      relations: ['pronoun', 'occasion', 'video', 'celeb', 'celeb.categories'],
      take: perPage,
      skip: perPage * page
    });

    return new Paging(result[0], result[1]);
  }
}

const queryFailedGuard = (err: any): err is QueryFailedError & { code: string } => err instanceof QueryFailedError;
