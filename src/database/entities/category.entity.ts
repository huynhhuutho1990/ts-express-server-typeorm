import { BaseEntity } from './base';
import { Entity, Column, Index, ManyToMany, OneToMany } from 'typeorm';
import { Celeb } from './celeb.entity';
import { ExplorerCategory } from './explorer_category.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  @Index({ unique: true })
  public name: string;

  @Column()
  @Index({ unique: true })
  public external_id: string;

  @ManyToMany(() => Celeb, (celeb) => celeb.categories, { onDelete: 'CASCADE' })
  public celebs: Celeb[];

  @OneToMany(() => ExplorerCategory, (explorerCategory) => explorerCategory.category)
  public explorerCategories: ExplorerCategory[];

  @Column({ nullable: true, default: 99 })
  public order: number;
}
