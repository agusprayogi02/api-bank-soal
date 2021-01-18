import {getRepository} from 'typeorm'
import {Pelajaran} from '../entity/Pelajaran'
import {Request, Response, NextFunction} from 'express'

export class PelajaranController {
  private pelajaran = getRepository(Pelajaran)
  async all(req: Request, res: Response, next: NextFunction) {
    return this.pelajaran.find({relations: ['sekolah', 'soals', 'guru', 'nilai']})
  }
}
