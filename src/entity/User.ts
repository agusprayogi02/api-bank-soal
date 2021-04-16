import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany} from 'typeorm';
import {Sekolah} from './Sekolah';
import {Nilai} from './Nilai';
import {Pelajaran} from './Pelajaran';

export enum UserRole {
  ADMIN = 'admin',
  SISWA = 'siswa',
  GURU = 'guru',
}

export enum Jk {
  L = 'L',
  P = 'P',
}
@Entity()
export class User {
  @PrimaryColumn('varchar', {length: 20})
  uid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: Jk, default: Jk.L})
  jk: Jk;

  @Column({type: 'enum', enum: UserRole, default: UserRole.SISWA})
  role: UserRole;

  @ManyToOne(() => Sekolah, (sekolah) => sekolah.users, {onUpdate: 'CASCADE'})
  sekolah: Sekolah;

  @OneToMany(() => Pelajaran, (pelajaran) => pelajaran.guru, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pelajarans: Pelajaran[];

  @OneToMany(() => Nilai, (nilai) => nilai.user)
  nilais: Nilai[];
}
