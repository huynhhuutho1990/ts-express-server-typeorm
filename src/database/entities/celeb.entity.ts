import { BaseEntity } from './base';
import { Entity, Column, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn, Index, ManyToOne } from 'typeorm';
import {
  CelebSocial,
  CelebMedia,
  Category,
  User,
  Request,
  Rating,
  ExplorerCelebrity,
  Video,
  StorePriceProduct
} from './index';

@Entity()
export class Celeb extends BaseEntity {
  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ nullable: true })
  public user_id: string;

  @Column()
  public name: string;

  @Column({ nullable: true, type: 'text' })
  public description?: string;

  @Column({ nullable: true })
  public photo?: string;

  @Column({ nullable: true })
  public thumbnail?: string;

  @Column({ nullable: true })
  public response_time_days?: number;

  @Column({ nullable: true })
  public video_per_week: number;

  @OneToMany(() => CelebSocial, (social) => social.celeb, { cascade: true })
  public socials: CelebSocial[];

  @OneToMany(() => CelebMedia, (media) => media.celeb, { cascade: true })
  public medias: CelebMedia[];

  @ManyToMany(() => Category, (cate) => cate.celebs, { cascade: true })
  @JoinTable({ name: 'celeb_category' })
  public categories: Category[];

  @OneToMany(() => Request, (request) => request.celeb)
  public requests: Request[];

  @OneToMany(() => Rating, (rating) => rating.celeb)
  public ratings: Rating[];

  @OneToMany(() => ExplorerCelebrity, (explorerCelebrity) => explorerCelebrity.celeb)
  public explorerCelebs: ExplorerCelebrity[];

  @Column()
  @Index({ unique: true })
  public external_id: string;

  @Column({ nullable: true })
  public team_notes: string;

  @Column({ nullable: true, type: 'timestamptz' })
  public date_joined: Date;

  @OneToMany(() => Video, (video) => video.celeb)
  public videos: Video[];

  @ManyToOne(() => StorePriceProduct, { nullable: true, cascade: true })
  @JoinColumn({ name: 'store_price_product_id' })
  public store_price_product: StorePriceProduct;

  @Column()
  @Index({ unique: true })
  public slug_url: string;

  @Column({ nullable: true, type: 'text' })
  public profile?: string;
}
