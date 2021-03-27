import {getRepository} from 'typeorm';
import {Pelajaran} from '../entity/Pelajaran';
import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
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

  async uploaded(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.log(req.file.filename);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    var uid = req.body.uid;
    if (req.file == undefined || req.file == null) {
      res.send(<ResultBack>{
        status: 400,
        data: {name: 'Error', error: 'Tidak ada file yang diupload!'},
      });
    }
    var user = await new UserController().findOne(uid);
    var data = {
      kdPelajaran: makeid(8).toUpperCase(),
      gambar: req.file.path,
      guru: user,
    };
    // console.log(data);
    // console.log(Object.assign(req.body, data));
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
