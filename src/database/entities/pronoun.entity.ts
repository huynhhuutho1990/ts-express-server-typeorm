import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class Pronoun extends BaseEntity {
  @Column()
  @Index({ unique: true })
  public name: string;

  @Column()
  @Index({ unique: true })
  public external_id: string;

  @Column({ nullable: true, default: 99 })
  public order: number;
}
