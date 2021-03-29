import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from './User';
import {Pelajaran} from './Pelajaran';
import {Kuis} from './Kuis';

@Entity()
export class Nilai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int', width: 3})
  nilai: number;

  @Column()
  salah: number;

  @Column()
  benar: number;

  @ManyToOne(() => User, (user) => user.nilais)
  user: User;

  @ManyToOne(() => Kuis, (kuis) => kuis.pelajaran)
  kuis: Kuis;
}
