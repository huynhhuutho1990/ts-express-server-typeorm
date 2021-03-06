import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { BaseEntity } from './base';
import { ExplorerGroup, Celeb } from '.';

@Entity({ name: 'explorer_celeb' })
export class ExplorerCelebrity extends BaseEntity {
  @ManyToOne(() => Celeb, (celeb) => celeb.explorerCelebs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;

  @Column({ name: 'celeb_id' })
  @RelationId((explorerCelebrity: ExplorerCelebrity) => explorerCelebrity.celeb)
  celebId: string;

  @ManyToOne(() => ExplorerGroup, (explorerGroup) => explorerGroup.explorerCelebs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  public explorerGroup: ExplorerGroup;

  @Column()
  public order: number;
}
