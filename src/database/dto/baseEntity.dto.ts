import { plainToClass } from 'class-transformer';

export default abstract class BaseEntityDto<Entity> {
  protected abstract getEntityClass(): new () => Entity;

  toEntityObject(): Entity {
    return plainToClass(this.getEntityClass(), this);
  }
}
