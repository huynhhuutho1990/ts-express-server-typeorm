import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { ExplorerCelebrity } from './explorer_celeb.entity';
import { ExplorerCategory } from './explorer_category.entity';
import EXPLORER_GROUP_TYPE from '../../utils/constants/explorerGroupType';

@Entity({ name: 'explorer_group' })
export class ExplorerGroup extends BaseEntity {
  @Column({ nullable: true })
  public title?: string;

  @Column({ nullable: true })
  public label?: string;

  @Column({ default: EXPLORER_GROUP_TYPE.CELEBRITY })
  public type: EXPLORER_GROUP_TYPE;

  @OneToMany(() => ExplorerCelebrity, (explorerCelebrity) => explorerCelebrity.explorerGroup, { cascade: true })
  public explorerCelebs: ExplorerCelebrity[];

  @OneToMany(() => ExplorerCategory, (explorerCelebrity) => explorerCelebrity.explorerGroup, { cascade: true })
  public explorerCategories: ExplorerCategory[];

  @Column()
  public order: number;
}
