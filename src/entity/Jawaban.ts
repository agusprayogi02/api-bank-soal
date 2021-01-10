import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {Soal} from './Soal'

@Entity()
export class Jawaban {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  answer: string

  @Column()
  gambar: string

  @Column()
  jawab: boolean

  @ManyToOne(() => Soal, (soal) => soal.jawaban)
  soal: Soal
}
