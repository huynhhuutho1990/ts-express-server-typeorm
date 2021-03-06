import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { BaseEntity } from './base';
import { ExplorerGroup, Category } from '.';

@Entity({ name: 'explorer_category' })
export class ExplorerCategory extends BaseEntity {
  @ManyToOne(() => Category, (category) => category.explorerCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @Column({ name: 'category_id' })
  @RelationId((explorerCategory: ExplorerCategory) => explorerCategory.category)
  categoryId: string;

  @ManyToOne(() => ExplorerGroup, (explorerGroup) => explorerGroup.explorerCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  public explorerGroup: ExplorerGroup;

  @Column()
  public order: number;
}
