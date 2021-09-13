import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Attractor } from './attractor.entity';
@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  artworkid: number;

  @ManyToOne(() => User, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'userid'})
  user: User;

  @Column()
  title: string;

  @Column()
  canvas_width: number;

  @Column()
  canvas_height: number;

  @Column({ type: 'float' })
  gamma: number;

  @Column({ type: 'int' })
  created_at: number;

  @Column({ type: 'int' })
  last_updated_at: number;

  @OneToMany(() => Attractor, attractor => attractor.artwork)
  @JoinColumn({name: 'attractorid'})
  attractors: Attractor[]
}
