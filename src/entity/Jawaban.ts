import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from 'typeorm'
import {Soal} from './Soal'

@Entity()
export class Jawaban {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  answer: string

  @OneToOne(() => Soal, (soal) => soal.jawaban)
  soal: Soal
}
