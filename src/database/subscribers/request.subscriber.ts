import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Request } from '../entities';
import RequestActivityUtils from '../../utils/classes/requestActivity.utils';

@EventSubscriber()
export class RequestSubscriber implements EntitySubscriberInterface<Request> {
  listenTo(): any {
    return Request;
  }

  afterInsert(event: InsertEvent<Request>): Promise<any> | void {
    RequestActivityUtils.processActivity(null, event.entity);
  }

  afterUpdate?(event: UpdateEvent<Request>): Promise<any> | void {
    RequestActivityUtils.processActivity(event.databaseEntity, event.entity);
  }
}
