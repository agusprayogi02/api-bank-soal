import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Sekolah} from './Sekolah'

export enum UserRole {
  ADMIN = 'admin',
  SISWA = 'siswa',
  GURU = 'guru',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @Column({type: 'int', width: 2})
  age: number

  @Column({type: 'enum', enum: UserRole, default: UserRole.SISWA})
  role: UserRole

  @ManyToOne(() => Sekolah, (sekolah) => sekolah.users, {onUpdate: 'CASCADE'})
  sekolah: Sekolah
}
