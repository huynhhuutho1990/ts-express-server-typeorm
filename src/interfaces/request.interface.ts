import { Request } from 'express';
import FirebaseUser from '../providers/firebase/firebaseUser';

export default interface RequestWithUser extends Request {
  user: FirebaseUser;
}
