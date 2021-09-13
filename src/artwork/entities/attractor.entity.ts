import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Artwork } from './artwork.entity';
import { Variation } from './variation.entity';

@Entity()
export class Attractor {
  @PrimaryGeneratedColumn()
  attractorid: number;

  @ManyToOne(() => Artwork, artwork => artwork.attractors)
  @JoinColumn({name: 'artworkid'})
  artwork: Artwork;

  @Column({ type: 'float' })
  affine_a: number;

  @Column({ type: 'float' })
  affine_b: number;

  @Column({ type: 'float' })
  affine_c: number;

  @Column({ type: 'float' })
  affine_d: number;

  @Column({ type: 'float' })
  affine_e: number;

  @Column({ type: 'float' })
  affine_f: number;

  @Column({ type: 'float' })
  weight: number;

  @Column()
  color_r: number;

  @Column()
  color_g: number;

  @Column()
  color_b: number;

  @OneToMany(() => Variation, variation => variation.attractor)
  @JoinColumn({ name: 'variationid' })
  variations: Variation[]
}
