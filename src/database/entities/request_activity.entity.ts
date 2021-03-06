import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { REQUEST_STATUS_TYPE } from '../../utils/constants';
import { Request } from './request.entity';
import { User } from './user.entity';
import { Celeb } from './celeb.entity';

@Entity({ name: 'request_activity' })
export class RequestActivity extends BaseEntity {
  @Column({ nullable: true })
  public from_status: REQUEST_STATUS_TYPE;

  @Column()
  public to_status: REQUEST_STATUS_TYPE;

  @Column({ type: 'jsonb', nullable: true })
  // eslint-disable-next-line @typescript-eslint/ban-types
  public old_request: Object;

  @Column('jsonb')
  // eslint-disable-next-line @typescript-eslint/ban-types
  public new_request: Object;

  @ManyToOne(() => Request, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  public request: Request;
  @Column()
  public request_id: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'changed_by' })
  public user?: User;
  @Column({ nullable: true })
  public changed_by?: string;

  @ManyToOne(() => Celeb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;
  @Column()
  public celeb_id: string;
}
