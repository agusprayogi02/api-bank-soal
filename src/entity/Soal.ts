import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {Jawaban} from './Jawaban';
import {Kuis} from './Kuis';
import {Pelajaran} from './Pelajaran';

@Entity()
export class Soal {
  @PrimaryGeneratedColumn()
  kdSoal: number;

  @Column('text')
  soal: string;

  @Column()
  gambar: string;

  @OneToMany(() => Jawaban, (jawab) => jawab.soal, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn()
  jawaban: Jawaban;

  @ManyToOne(() => Kuis, (kuis) => kuis.soals)
  kuis: Kuis;
}
