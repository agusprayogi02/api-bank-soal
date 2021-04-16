import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {Nilai} from './Nilai';
import {Pelajaran} from './Pelajaran';
import {Soal} from './Soal';

@Entity()
export class Kuis {
  @PrimaryColumn()
  kd: string;

  @Column()
  nama: string;

  @Column()
  deskripsi: string;

  @Column({default: null})
  gambar: string;

  @Column()
  tenggat: string;

  @ManyToOne(() => Pelajaran, (pel) => pel.kuises, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  pelajaran: Pelajaran;

  @OneToMany(() => Nilai, (nilai) => nilai.kuis)
  nilais: Nilai[];

  @OneToMany(() => Soal, (soal) => soal.kuis)
  soals: Soal[];
}
