import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Kuis} from '../entity';

export class KuisController {
  private kuis = getRepository(Kuis);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.kuis.find({relations: ['pelajaran', 'nilais', 'soals']});
  }
}
