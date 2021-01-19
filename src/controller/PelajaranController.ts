import {getRepository} from 'typeorm'
import {Pelajaran} from '../entity/Pelajaran'
import {Request, Response, NextFunction} from 'express'
import {UserController} from './UserController'

export class PelajaranController {
  private pelajaran = getRepository(Pelajaran)
  async all(req: Request, res: Response, next: NextFunction) {
    return this.pelajaran.find({relations: ['soals', 'guru', 'nilai']})
  }

  async create(req: Request, res: Response, next: NextFunction) {
    var user = new UserController().findOne(req.params.uid)
    var data = {
      guru: user,
    }
    return this.pelajaran.save(Object.assign(req.body, data))
  }
}
