import { BaseEntity } from './base';
import { Entity, Column, Index } from 'typeorm';

@Entity()
export class StorePriceProduct extends BaseEntity {
  @Column()
  @Index({ unique: true })
  public name: string;

  @Column()
  @Index({ unique: true })
  public external_id: string;

  @Column()
  @Index({ unique: true })
  public product_id: string;

  @Column({ type: 'decimal', default: 0 })
  public price: number;

  @Column({ type: 'decimal', default: 0 })
  public display_price: number;
}
