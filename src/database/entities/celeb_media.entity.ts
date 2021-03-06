import { BaseEntity } from './base';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Celeb } from './celeb.entity';
import { CELEB_MEDIA_TYPE } from '../../utils/constants';

@Entity({ name: 'celeb_media' })
export class CelebMedia extends BaseEntity {
  @ManyToOne(() => Celeb, (celeb) => celeb.medias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;
  @Column()
  public celeb_id: string;

  @Column()
  public type: CELEB_MEDIA_TYPE;

  @Column()
  public link: string;
}
