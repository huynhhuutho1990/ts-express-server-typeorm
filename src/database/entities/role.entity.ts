import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class Role extends BaseEntity {
  @Column()
  @Index({ unique: true })
  public name: string;
}
