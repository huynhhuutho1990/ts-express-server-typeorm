import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export default class SetRoleDto {
  @IsUUID()
  @IsNotEmpty()
  public user_id: string;

  @IsString()
  @IsNotEmpty()
  public role_name: string;
}
