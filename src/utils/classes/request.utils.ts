import { UserService } from '../../services';
import { User } from '../../database/entities';
import FirebaseAuthService from '../../providers/firebase/firebaseAuth.service';
import RequestWithUser from '../../interfaces/request.interface';
import { ForbiddenError, AuthFailureError } from '../../common/api-error';

const userService = new UserService();

export default class RequestUtils {
  static async getCurrentUser(firebaseUID: string): Promise<User>;
  static async getCurrentUser(req: RequestWithUser): Promise<User>;
  static async getCurrentUser(reqOrUid: string | RequestWithUser): Promise<User> {
    let firebaseUID;
    if (typeof reqOrUid == 'string') {
      firebaseUID = reqOrUid;
    } else {
      firebaseUID = reqOrUid.user.firebaseUID;
    }
    let user = await userService.getUserByExternalId(firebaseUID);

    if (!user) {
      const firebaseUser = await FirebaseAuthService.getUserFromUid(firebaseUID);
      // create new entity
      const newUser = new User();
      newUser.external_id = firebaseUser.uid;
      newUser.email = firebaseUser.email;
      newUser.phone_number = firebaseUser.phoneNumber;
      newUser.name = firebaseUser.displayName || firebaseUser.email;
      newUser.photo = firebaseUser.photoURL;
      try {
        user = await userService.save(newUser);
      } catch (e) {
        // insert failed, retry getting from db
        user = await userService.getUserByExternalId(firebaseUID);
      }
    }

    if (!user) {
      throw new AuthFailureError('User not found');
    } else if (user?.disabled) {
      throw new ForbiddenError('Your account is blocked from performing this action');
    }

    return user;
  }
}
