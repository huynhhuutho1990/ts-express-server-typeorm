import { BaseEntity } from './base';
import { Column, Entity, OneToOne, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Request } from './request.entity';
import { User } from './user.entity';
import { Celeb } from './celeb.entity';

@Entity()
export class Video extends BaseEntity {
  @OneToOne(() => Request, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'request_id' })
  public request: Request;
  @Column({ nullable: true })
  public request_id: string;

  @Column()
  public url: string;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column()
  public user_id: string;

  @ManyToOne(() => Celeb, (celeb) => celeb.videos)
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;

  @Column()
  public celeb_id: string;

  @Column()
  @Index({ unique: true })
  public slug_url: string;
}
