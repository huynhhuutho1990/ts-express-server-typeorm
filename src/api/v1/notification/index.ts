import express from 'express';
import RequestDtoValidator from '../../../middlewares/requestDtoValidator';
import { UserNotificationTokenDto, NotificationDto } from '../../../database/dto/';
import { plainToClass } from 'class-transformer';
import { UserNotificationTokenService } from '../../../services';
import { SuccessMsgResponse, BadRequestResponse, FailureMsgResponse } from '../../../common/api-response';
import { extractBearerToken } from '../../../middlewares/verifyToken';
import FirebaseAuthService from '../../../providers/firebase/firebaseAuth.service';
import RequestUtils from '../../../utils/classes/request.utils';
import NotificationUtils from '../../../utils/classes/notification.utils';
import FirebaseMessageService from '../../../providers/firebase/firebaseMessage.service';

const router = express.Router();
// service
const userNotificationTokenService = new UserNotificationTokenService();

router.post('/token', RequestDtoValidator(UserNotificationTokenDto), async (req, res) => {
  const bearerToken = extractBearerToken(req);
  let fid: string = null;
  if (bearerToken) {
    const firebaseUser = await FirebaseAuthService.verifyToken(bearerToken);
    if (firebaseUser) {
      fid = firebaseUser.uid;
    }
  }

  const token = plainToClass(UserNotificationTokenDto, req.body);
  let tokenDb = token.toEntityObject();

  if (fid) {
    const user = await RequestUtils.getCurrentUser(fid);
    tokenDb.user_id = user.id;
  }

  tokenDb = await userNotificationTokenService.createOrUpdate(tokenDb);

  return new SuccessMsgResponse('Successfully added token').send(res);
});

router.post('/test', RequestDtoValidator(NotificationDto), async (req, res) => {
  const notiDto = plainToClass(NotificationDto, req.body);

  if (notiDto.broadcast) {
    await NotificationUtils.sendNotificationToAllUsers(notiDto);

    return new SuccessMsgResponse('Notifications sent to all users').send(res);
  } else if (notiDto.user_id) {
    // send by user id
    await NotificationUtils.sendNotification(notiDto.user_id, notiDto);

    return new SuccessMsgResponse(`Successfully send notification to user with id ${notiDto.user_id}`).send(res);
  } else if (notiDto.fcm_token) {
    // send by fcm token
    const success = await FirebaseMessageService.sendNotification(notiDto.fcm_token, notiDto);

    if (success) {
      return new SuccessMsgResponse(`Successfully send notification to fcm token ${notiDto.fcm_token}`).send(res);
    } else {
      return new FailureMsgResponse(`Failed to send notification to fcm token ${notiDto.fcm_token}`).send(res);
    }
  }
  // else, send bad request
  return new BadRequestResponse().send(res);
});

export default router;
