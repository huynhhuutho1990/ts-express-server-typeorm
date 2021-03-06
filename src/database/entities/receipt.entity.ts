import { BaseEntity } from './base';
import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { RECEIPT_TYPE, PAYMENT_STATUS_TYPE } from '../../utils/constants';
import { Request } from './request.entity';

@Entity()
export class Receipt extends BaseEntity {
  @Column({ type: 'text' })
  public receipt: string;

  @Column()
  public type: RECEIPT_TYPE;

  @OneToOne(() => Request, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  public request: Request;
  @Column()
  public request_id: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  public purchase_id: string;

  @Column()
  public status: PAYMENT_STATUS_TYPE;
}
