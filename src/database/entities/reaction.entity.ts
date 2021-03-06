import { Entity, Column, JoinColumn, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { REACTION_TYPE } from '../../utils/constants';
import { User } from './user.entity';

@Entity()
@Index(['user_id', 'content_id'], { unique: true })
export class Reaction extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column()
  public user_id: string;

  @Column()
  @Index()
  public content_id: string;

  @Column()
  public type: REACTION_TYPE;
}
