import {Sekolah} from '../entity/Sekolah'
import {getRepository} from 'typeorm'
import {Request, Response, NextFunction} from 'express'
import {makeid} from '../utils'

export class SekolahController {
  private sekolah = getRepository(Sekolah)
  async all(req: Request, res: Response, next: NextFunction) {
    return this.sekolah.find({relations: ['users']})
  }

  async save(req: Request, res: Response, next: NextFunction) {
    return this.sekolah.save(Object.assign(req.body, {code: makeid(6).toUpperCase()}))
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    return this.sekolah.find()
  }

  async findOne(id: string) {
    return this.sekolah.findOne({where: {id: id}, relations: ['users']})
  }

  async find(req: Request, res: Response, next: NextFunction) {
    return this.sekolah.findOne(req.params.id, {relations: ['users']})
  }
}
