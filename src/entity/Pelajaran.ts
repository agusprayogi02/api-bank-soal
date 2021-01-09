import {Entity, PrimaryColumn, Column, ManyToMany, OneToMany, ManyToOne} from 'typeorm'
import {User} from './User'
import {Soal} from './Soal'

@Entity()
export class Pelajaran {
  @PrimaryColumn({type: 'varchar', length: 20})
  kdPelajaran: string

  @Column({type: 'varchar', length: 100})
  nama: string

  @ManyToOne(() => User, (user) => user.pelajarans)
  user: User

  @OneToMany(() => Soal, (soal) => soal.pelajaran)
  soals: Soal[]
}
