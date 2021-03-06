import BaseService from './base.service';
import { RequestActivity } from '../../database/entities/request_activity.entity';
import IRequestActivityService from '../interface/request_activity.service';

export default class RequestActivityService extends BaseService<RequestActivity> implements IRequestActivityService {
  protected getEntityClass(): new () => RequestActivity {
    return RequestActivity;
  }
}
