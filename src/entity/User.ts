import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
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

  @Column()
  email: string

  @Column()
  password: string

  @Column({type: 'int', width: 2})
  age: number

  @Column({type: 'int', width: 2})
  kelas: number

  @Column({type: 'enum', enum: UserRole, default: UserRole.SISWA})
  role: UserRole

  @ManyToOne(() => Sekolah, {onUpdate: 'CASCADE'})
  @JoinColumn({referencedColumnName: 'id'})
  sekolah: Sekolah
}
