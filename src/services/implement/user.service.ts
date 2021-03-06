import IUserService from '../interface/user.service';
import { User } from '../../database/entities/user.entity';
import BaseService from './base.service';

class UserService extends BaseService<User> implements IUserService {
  protected getEntityClass(): new () => User {
    return User;
  }

  getUserByExternalId(id: string): Promise<User> {
    return this.repository.findOne({ external_id: id });
  }

  getUserAndRole(id: string): Promise<User> {
    return this.repository.findOne({ id }, { relations: ['roles'] });
  }

  getUserByUserName(user_name: string): Promise<User> {
    return this.repository.findOne({ user_name });
  }
}

export default UserService;
