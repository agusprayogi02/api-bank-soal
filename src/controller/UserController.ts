import {getRepository} from 'typeorm'
import {NextFunction, Request, Response} from 'express'
import {User} from '../entity/User'
import {SekolahController} from './SekolahController'
import {validationResult} from 'express-validator'

export class UserController {
  private userRepository = getRepository(User)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({relations: ['sekolah']})
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id, {relations: ['sekolah']})
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({errors: errors.array()})
    }
    var getSekolah = await new SekolahController().findOne(request.params.id)
    var sekolah = {
      sekolah: getSekolah,
    }
    return this.userRepository.save(Object.assign(request.body, sekolah))
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id)
    await this.userRepository.remove(userToRemove)
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }
    return this.userRepository.findOne(req.body, {relations: ['sekolah']})
  }
}
