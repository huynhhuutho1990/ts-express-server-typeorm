import { RequestActivityService } from '../../services';
import { Request, RequestActivity } from '../../database/entities';

const requestActivityService = new RequestActivityService();

export default class RequestActivityUtils {
  /**
   * Asynchronously adding activity for a request changed event
   * @param from
   * @param to
   */
  static processActivity(from: Request, to: Request): void {
    const requestActivity = new RequestActivity();

    requestActivity.from_status = from?.status;
    requestActivity.to_status = to.status;
    requestActivity.old_request = from;
    requestActivity.new_request = to;
    requestActivity.request_id = to.id;
    requestActivity.celeb_id = to.celeb_id;

    requestActivityService.save(requestActivity);
  }
}
