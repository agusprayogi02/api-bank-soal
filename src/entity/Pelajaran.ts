import {Entity, PrimaryColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import {User} from './User';
import {Nilai} from './Nilai';
import {Kuis} from './Kuis';

@Entity()
export class Pelajaran {
  @PrimaryColumn({type: 'varchar', length: 20})
  kdPelajaran: string;

  @Column({type: 'varchar', length: 100})
  nama: string;

  @Column()
  deskripsi: string;

  @Column({default: null})
  gambar: string;

  @ManyToOne(() => User, (user) => user.pelajarans)
  guru: User;

  @OneToMany(() => Kuis, (kuis) => kuis.pelajaran)
  kuises: Kuis[];
}
