import { Entity, JoinColumn, Column, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { User } from './user.entity';
import { Celeb } from './celeb.entity';

@Entity()
@Index(['user_id', 'celeb_id'], { unique: true })
export class LikeCeleb extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column()
  public user_id: string;

  @ManyToOne(() => Celeb, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;
  @Column()
  public celeb_id: string;
}
