import BaseService from './base.service';
import { Role } from '../../database/entities/role.entity';
import IRoleService from '../interface/role.service';

export default class RoleService extends BaseService<Role> implements IRoleService {
  protected getEntityClass(): new () => Role {
    return Role;
  }

  getRoleByName(name: string): Promise<Role> {
    return this.repository.findOne({ name });
  }
}
