import { Entity, Column, JoinColumn, ManyToOne, OneToOne, Index } from 'typeorm';
import { BaseEntity } from './base';
import { REQUEST_STATUS_TYPE, PAYMENT_STATUS_TYPE } from '../../utils/constants';
import { Occasion } from './occasion.entity';
import { Pronoun } from './pronoun.entity';
import { User } from './user.entity';
import { Celeb } from './celeb.entity';
import { Rating } from './rating.entity';
import { Video } from './video.entity';

@Entity()
export class Request extends BaseEntity {
  @ManyToOne(() => User, (user) => user.requests)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column()
  public user_id: string;

  @ManyToOne(() => Celeb, (celeb) => celeb.requests, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;
  @Column({ nullable: true })
  public celeb_id: string;

  @Column()
  @Index({ unique: true })
  public request_number: string;

  @Column({ type: 'decimal', default: 0 })
  public price: number;

  @Column({ type: 'decimal', default: 0 })
  public display_price: number;

  @Column({ nullable: true })
  public introduction?: string;

  @Column('text')
  public instruction: string;

  @Column({ nullable: true })
  public receiver_name?: string;

  @Column({ nullable: true })
  public buyer_email?: string;

  @Column({ nullable: true })
  public buyer_phone?: string;

  @Column({ nullable: true, type: 'timestamptz' })
  public accept_reject_date?: Date;

  @Column({ nullable: true, type: 'text' })
  public team_notes: string;

  @Column()
  public payment_status: PAYMENT_STATUS_TYPE;

  @Column()
  public status: REQUEST_STATUS_TYPE;

  @ManyToOne(() => Pronoun, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'pronoun_id' })
  public pronoun: Pronoun;
  @Column({ nullable: true })
  public pronoun_id: string;

  @ManyToOne(() => Occasion, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'occasion_id' })
  public occasion: Occasion;
  @Column({ nullable: true })
  public occasion_id: string;

  @OneToOne(() => Rating, (rating) => rating.request)
  public rating: Rating;

  @Column({ nullable: true })
  public external_id?: string;

  @OneToOne(() => Video, (request) => request.request, { cascade: true })
  public video: Video;

  @Column({ nullable: true })
  public payment_method?: string;
}
