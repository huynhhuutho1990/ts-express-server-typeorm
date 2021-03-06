import { BaseEntity } from './base';
import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '.';

@Entity()
export class UserNotificationToken extends BaseEntity {
  @Column()
  @Index({ unique: true })
  public token: string;

  @ManyToOne(() => User, (user) => user.notification_tokens, { cascade: true, nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user?: User;
  @Column({ nullable: true })
  public user_id?: string;
}
