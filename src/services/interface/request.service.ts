import IBaseService from './base.service';
import { Request } from '../../database/entities/request.entity';
import Paging from '../../common/paging';

export default interface IRequestService extends IBaseService<Request> {
  getAllByCelebId(id: string): Promise<Request[]>;

  getRequestByRequestNumber(request_number: string, relations: string[]): Promise<Request>;

  create(entity: Request): Promise<Request>;

  getByRequestNumber(requestNumber: string, relations: string[]): Promise<Request>;

  getRequestHistoryByUserId(uid: string, page: number, perPage?: number): Promise<Paging<Request>>;
}
