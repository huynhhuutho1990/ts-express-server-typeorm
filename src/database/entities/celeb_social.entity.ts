import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { Celeb } from './celeb.entity';
import { CELEB_SOCIAL_TYPE } from '../../utils/constants';

@Entity({ name: 'celeb_social' })
export class CelebSocial extends BaseEntity {
  // @ManyToOne(() => Celeb, (celeb) => celeb.socials)
  @ManyToOne(() => Celeb, (celeb) => celeb.socials, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'celeb_id' })
  public celeb: Celeb;

  @Column()
  public celeb_id: string;

  @Column()
  public type: CELEB_SOCIAL_TYPE;

  @Column()
  public link: string;
}
