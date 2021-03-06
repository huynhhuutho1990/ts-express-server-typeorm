import IBaseService from './base.service';
import { Role } from '../../database/entities/role.entity';

export default interface IRoleService extends IBaseService<Role> {
  getRoleByName(name: string): Promise<Role>;
}
