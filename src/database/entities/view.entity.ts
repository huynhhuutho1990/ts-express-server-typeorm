import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { Video } from './video.entity';
import { User } from './user.entity';

@Entity()
export class View extends BaseEntity {
  @ManyToOne(() => Video)
  @JoinColumn({ name: 'video_id' })
  public video: Video;
  @Column()
  public video_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column()
  public user_id: string;
}
