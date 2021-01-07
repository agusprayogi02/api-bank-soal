import {getRepository} from 'typeorm'
import {NextFunction, Request, Response} from 'express'
import {User} from '../entity/User'
import {SekolahController} from './SekolahController'
import {error} from '../type'

export class UserController {
  private userRepository = getRepository(User)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({relations: ['sekolah']})
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id, {relations: ['sekolah']})
  }

  async save(req: Request, res: Response, next: NextFunction) {
    var getSekolah = await new SekolahController().findOne(req.params.id)
    var sekolah = {
      sekolah: getSekolah,
    }
    var result = this.userRepository.save(Object.assign(req.body, sekolah))
    if (result instanceof Promise) {
      result.then((result) =>
        result !== null && result !== undefined
          ? res.send(result)
          : res.send({
              name: 'Error',
              error: error.REGISTER,
            }),
      )
    } else if (result !== null && result !== undefined) {
      res.json(result)
    } else {
      res.send({
        name: 'Error',
        error: error.REGISTER,
      })
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id)
    await this.userRepository.remove(userToRemove)
  }

  async login(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    var result = this.userRepository.findOne(req.body, {relations: ['sekolah']})
    if (result instanceof Promise) {
      result.then((result) =>
        result !== null && result !== undefined
          ? res.send(result)
          : res.send({
              name: 'Error',
              error: error.LOGIN,
            }),
      )
    } else if (result !== null && result !== undefined) {
      res.json(result)
    } else {
      res.send({
        name: 'Error',
        error: error.LOGIN,
      })
    }
  }
}
