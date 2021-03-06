import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base';
import { Celeb } from './celeb.entity';

@Entity()
export class HomeCeleb extends BaseEntity {
  @ManyToOne(() => Celeb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;
  @Column()
  public celeb_id: string;

  @Column()
  public order: number;
}
