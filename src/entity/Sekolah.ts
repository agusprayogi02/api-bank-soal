import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {User} from './User'

@Entity()
export class Sekolah {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nama: string

  @Column({type: 'int', width: 2})
  kelas: number

  @Column()
  jurusan: string

  @Column({type: 'varchar', length: 6})
  kode: string

  @OneToMany(() => User, (user) => user.sekolah)
  users: User[]
}
