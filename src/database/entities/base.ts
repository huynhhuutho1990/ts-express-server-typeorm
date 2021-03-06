import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

/**
 * Data object with annotations to configure database in ORM
 */
@Entity()
export abstract class BaseEntity {
  constructor() {
    this.id = uuid();
  }
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  public deleted_at?: Date;
}
