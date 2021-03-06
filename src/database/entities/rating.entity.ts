import { Entity, Column, ManyToOne, JoinColumn, OneToOne, Index } from 'typeorm';
import { BaseEntity } from './base';
import { Celeb } from './celeb.entity';
import { Request } from './request.entity';

@Entity()
@Index(['request_id', 'celeb_id'], { unique: true })
export class Rating extends BaseEntity {
  @OneToOne(() => Request)
  @JoinColumn({ name: 'request_id' })
  public request: Request;
  @Column()
  public request_id: string;

  @ManyToOne(() => Celeb, (celeb) => celeb.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;
  @Column()
  public celeb_id: string;

  @Column('real')
  public point: number;
}
