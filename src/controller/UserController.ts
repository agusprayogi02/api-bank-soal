import {getRepository} from 'typeorm'
import {NextFunction, Request, Response} from 'express'
import {User} from '../entity/User'
import {SekolahController} from './SekolahController'
import {error} from '../type'
import {makeid} from '../utils'

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
      uid: makeid(16),
      sekolah: getSekolah,
    }
    var result = this.userRepository.save(Object.assign(req.body, sekolah))
    if (result instanceof Promise) {
      result
        .then((result) =>
          result !== null && result !== undefined
            ? res.send(result)
            : res.send({
                name: 'Error',
                error: error.REGISTER,
              }),
        )
        .catch(
          (e) =>
            res.send({
              name: 'Error',
              error: e.message,
            }),
          // console.log('apa : ini :' + e.message),
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
