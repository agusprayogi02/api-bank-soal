import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Nilai} from './Nilai';
import {Pelajaran} from './Pelajaran';
import {Soal} from './Soal';

@Entity()
export class Kuis {
  @PrimaryGeneratedColumn()
  kd: number;

  @Column()
  nama: string;

  @Column()
  deskripsi: string;

  @Column({default: null})
  gambar: string;

  @ManyToOne(() => Pelajaran, (pel) => pel.kuises)
  pelajaran: Pelajaran;

  @OneToMany(() => Nilai, (nilai) => nilai.kuis)
  nilais: Nilai[];

  @OneToMany(() => Soal, (soal) => soal.kuis)
  soals: Soal[];
}
