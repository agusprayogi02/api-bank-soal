import {getRepository} from 'typeorm';
import {Pelajaran} from '../entity/Pelajaran';
import {Request, Response, NextFunction} from 'express';
import {UserController} from './UserController';
import {ResultBack} from '../resultBack';
import {makeid} from '../utils';

export class PelajaranController {
  private pelajaran = getRepository(Pelajaran);
  async all(req: Request, res: Response, next: NextFunction) {
    return this.pelajaran.find({relations: ['guru', 'soals', 'nilais']});
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.pelajaran.findOne(req.params.id, {relations: ['guru', 'soals', 'nilais']});
  }

  async create(err, req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    if (err) {
      return res.send(<ResultBack>{
        status: 500,
        data: {name: 'Error', error: err.message},
      });
    }
    var user = new UserController().findOne(req.body.uid);
    var data = {
      kdPelajaran: makeid(8).toUpperCase(),
      gambar: req.file.fieldname,
      guru: user,
    };
    var save = this.pelajaran.save(Object.assign(req.body, data));
    save
      .then((result) =>
        result !== null && result !== undefined
          ? res.send(<ResultBack>{
              status: 200,
              data: result,
            })
          : res.send(<ResultBack>{
              status: 500,
              data: {name: 'Error', error: 'Tidak ada Id yang sama dalam database!'},
            }),
      )
      .catch((err) => {
        res.send(<ResultBack>{
          status: 500,
          data: {name: 'Error', error: err.message},
        });
      });
  }
}
