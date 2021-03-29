import {getRepository} from 'typeorm';
import {Request, Response, NextFunction} from 'express';
import {Nilai} from '../entity';

export class NilaiController {
  private nilai = getRepository(Nilai);
  async all(req: Request, res: Response, next: NextFunction) {
    return this.nilai.find({relations: ['user', 'pelajaran']});
  }
}
