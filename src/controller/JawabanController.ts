import {getRepository} from 'typeorm'
import {Request, Response, NextFunction} from 'express'
import {Jawaban} from '../entity/Jawaban'

export class JawabanController {
  private jawaban = getRepository(Jawaban)
  async all(req: Request, res: Response, next: NextFunction) {
    return this.jawaban.find({relations: ['soal']})
  }
}
