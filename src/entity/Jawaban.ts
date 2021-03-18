import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Soal} from './Soal';
export enum Jawab {
  SALAH = 'salah',
  BENAR = 'benar',
}

@Entity()
export class Jawaban {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  gambar: string;

  @Column({type: 'enum', enum: Jawab, default: Jawab.SALAH})
  jawab: Jawab;

  @ManyToOne(() => Soal, (soal) => soal.jawaban)
  soal: Soal;
}
