import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Attractor } from './attractor.entity';

@Entity()
export class Variation {
  @PrimaryGeneratedColumn()
  variationid: number;

  @Column({ type: 'float' })
  weight: number

  @Column()
  type_index: number
}
