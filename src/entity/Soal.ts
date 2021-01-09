import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from 'typeorm'
import {Jawaban} from './Jawaban'
import {Pelajaran} from './Pelajaran'

@Entity()
export class Soal {
  @PrimaryGeneratedColumn()
  kdSoal: number

  @Column()
  pertanyaan: string

  @Column()
  jawab1: string

  @Column()
  jawab2: string

  @Column()
  jawab3: string

  @Column()
  jawab4: string

  @Column()
  jawab5: string

  @OneToOne(() => Jawaban, (jawab) => jawab.soal, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn()
  jawaban: Jawaban

  @ManyToOne(() => Pelajaran, (pelajar) => pelajar.soals)
  pelajaran: Pelajaran
}
