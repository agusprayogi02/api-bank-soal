import {getRepository} from 'typeorm';
import {NextFunction, Request, Response} from 'express';
import {User} from '../entity/User';
import {SekolahController} from './SekolahController';
import {error} from '../type';
import {makeid} from '../utils';
import {ResultBack} from '../resultBack';
import * as bcrypt from 'bcrypt';

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({relations: ['sekolah', 'pelajarans', 'nilais']});
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id, {
      relations: ['sekolah', 'pelajarans', 'nilais'],
    });
  }

  async save(req: Request, res: Response, next: NextFunction) {
    var getSekolah = await new SekolahController().findOne(req.params.id);
    var password = await bcrypt.hash(req.body.password, 10);
    delete req.body.password;
    var sekolah = {
      uid: makeid(16),
      password,
      sekolah: getSekolah,
    };
    var result = this.userRepository.save(Object.assign(req.body, sekolah));

    if (result instanceof Promise) {
      result
        .then((result) =>
          result !== null && result !== undefined
            ? res.send(<ResultBack>{
                status: 200,
                data: result,
              })
            : res.send(<ResultBack>{
                status: 404,
                data: {name: 'Error', error: error.REGISTER},
              }),
        )
        .catch(
          (e: Error) =>
            res.send(<ResultBack>{
              status: 500,
              data: {name: e.name, error: e.message},
            }),
          // console.log('apa : ini :' + e.message),
        );
    } else if (result !== null && result !== undefined) {
      res.json(<ResultBack>{
        status: 200,
        data: result,
      });
    } else {
      res.send(<ResultBack>{
        status: 404,
        data: {name: 'Error', error: error.REGISTER},
      });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    var result = this.userRepository.findOne({email: req.body.email}, {relations: ['sekolah']});
    if (result instanceof Promise) {
      result.then(async (result) => {
        console.log(result);
        if (result !== null && result !== undefined) {
          var hasil = await bcrypt.compare(req.body.password, result.password);
          if (hasil) {
            res.json(<ResultBack>{
              status: 200,
              data: result,
            });
          } else {
            res.send(<ResultBack>{
              status: 404,
              data: {name: 'Error', error: error.LOGINPASS},
            });
          }
        } else {
          res.send(<ResultBack>{
            status: 404,
            data: {name: 'Error', error: error.LOGINEMAIL},
          });
        }
      });
    } else if (result !== null && result !== undefined) {
      res.json(<ResultBack>{
        status: 200,
        data: result,
      });
    } else {
      res.send(<ResultBack>{
        status: 404,
        data: {name: 'Error', error: error.LOGINEMAIL},
      });
    }
  }

  async pelajaran(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(req.params.id, {relations: ['pelajarans']});
  }

  async findOne(uid: string) {
    return this.userRepository.findOne(uid, {relations: ['sekolah']});
  }
}
