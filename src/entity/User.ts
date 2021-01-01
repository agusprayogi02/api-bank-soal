import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  SISWA = 'siswa',
  GURU = 'guru',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

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

  @Column()
  kelas: number

  @Column({type: 'varchar', length: 30})
  jurusan: string

  @Column({type: 'varchar', length: 100})
  sekolah: string

  @Column({type: 'enum', enum: UserRole, default: UserRole.SISWA})
  role: UserRole
}
