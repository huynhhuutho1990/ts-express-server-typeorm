import { Column, Entity, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';
import { BaseEntity } from './base';
import { Notification } from './notification.entity';
import { Request } from './request.entity';
import { Role } from './role.entity';
import { Video } from './video.entity';
import { UserNotificationToken } from './user_notification_token.entity';

/**
 * Data object with annotations to configure database in ORM
 */
@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true, length: 100 })
  @Index({ unique: true })
  public user_name?: string;

  @Column({ nullable: true })
  public name?: string;

  @Column({ nullable: true })
  public email?: string;

  @Column({ nullable: true })
  public phone_number?: string;

  @Column({ nullable: true })
  public photo?: string;

  @Column()
  @Index({ unique: true })
  public external_id: string;

  @Column({ nullable: true })
  public disabled?: boolean;

  @OneToMany(() => Notification, (noti) => noti.user)
  public notifications: Notification[];

  @OneToMany(() => Request, (request) => request.user)
  public requests: Request[];

  @OneToMany(() => Video, (video) => video.user)
  public videos: Video[];

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_role' })
  public roles: Role[];

  @OneToMany(() => UserNotificationToken, (token) => token.user)
  public notification_tokens: UserNotificationToken[];
}
