import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {User} from './User'
import {Pelajaran} from './Pelajaran'

@Entity()
export class Nilai {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'int', width: 3})
  nilai: number

  @Column()
  salah: number

  @Column()
  benar: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Pelajaran, (pelajaran) => pelajaran.nilai)
  pelajaran: Pelajaran
}
