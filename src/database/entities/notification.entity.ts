import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base';
import { User } from './user.entity';
import INotification from '../../interfaces/notification.interface';

@Entity()
export class Notification extends BaseEntity implements INotification {
  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column()
  public user_id: string;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public message?: string;

  @Column({ nullable: true })
  public image_url?: string;

  @Column({ default: false })
  public read: boolean;

  @Column({ type: 'jsonb', nullable: true })
  // eslint-disable-next-line @typescript-eslint/ban-types
  public payload?: { [key: string]: string };
}
