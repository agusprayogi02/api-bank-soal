import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import {type} from 'os'

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
}
