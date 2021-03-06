import { Expose, plainToClass } from 'class-transformer';
import BaseEntityDto from './baseEntity.dto';

export default abstract class BaseRetrieveDto<Entity> extends BaseEntityDto<Entity> {
  constructor(entity?: Entity) {
    super();
    if (entity) this.fromEntityObject(entity);
  }

  @Expose()
  public id: string;

  // @Expose()
  // public created_at: Date;

  // @Expose()
  // public updated_at: Date;

  protected abstract getCurrentClass(): new () => BaseRetrieveDto<Entity>;

  private fromEntityObject(entity: Entity): void {
    Object.assign(this, plainToClass(this.getCurrentClass(), entity));
  }
}
