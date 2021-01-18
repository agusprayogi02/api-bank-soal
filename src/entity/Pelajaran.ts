import {Entity, PrimaryColumn, Column, ManyToMany, OneToMany, ManyToOne} from 'typeorm'
import {User} from './User'
import {Soal} from './Soal'
import {Sekolah} from './Sekolah'
import {Nilai} from './Nilai'

@Entity()
export class Pelajaran {
  @PrimaryColumn({type: 'varchar', length: 20})
  kdPelajaran: string

  @Column({type: 'varchar', length: 100})
  nama: string

  @Column()
  deskripsi: string

  @Column()
  gambar: string

  @ManyToOne(() => Sekolah, (sekolah) => sekolah.pelajarans)
  sekolah: Sekolah

  @ManyToOne(() => User, (user) => user.pelajarans)
  guru: User

  @OneToMany(() => Soal, (soal) => soal.pelajaran)
  soals: Soal[]

  @OneToMany(() => Nilai, (nilai) => nilai.pelajaran)
  nilai: Nilai[]
}
