import {getRepository} from 'typeorm';
import {Request, Response, NextFunction} from 'express';
import {Soal} from '../entity/Soal';

export class SoalController {
  private soal = getRepository(Soal);
  async all(req: Request, res: Response, next: NextFunction) {
    return this.soal.find({relations: ['jawaban', 'pelajaran']});
  }
}
