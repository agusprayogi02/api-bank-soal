import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Sekolah {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nama: string

  @Column()
  jurusan: string
}
