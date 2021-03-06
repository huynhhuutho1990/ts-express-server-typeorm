import { User } from '../../database/entities/user.entity';
import IBaseService from './base.service';

export default interface IUserService extends IBaseService<User> {
  getUserByExternalId(id: string): Promise<User>;

  getUserAndRole(id: string): Promise<User>;
}
