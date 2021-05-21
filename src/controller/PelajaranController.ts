import {getRepository} from 'typeorm';
import {Pelajaran} from '../entity';
import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import {UserController} from './UserController';
import {ResultBack} from '../resultBack';
import {makeid} from '../utils';

export class PelajaranController {
  private pelajaran = getRepository(Pelajaran);
  async all(req: Request, res: Response, next: NextFunction) {
    return this.pelajaran.find({relations: ['guru', 'kuises']});
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.pelajaran.findOne(req.params.id, {relations: ['guru', 'kuises']});
  }

  async uploaded(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.log(req.file.filename);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    var kd = req.body.kdPelajaran,
      pel = await this.pelajaran.findOne(kd, {relations: ['guru']}),
      user = await new UserController().findOne(req.body.uid),
      data: object;
    if (req.file == undefined || req.file == null) {
      data = {
        guru: user,
      };
    } else {
      data = {
        gambar: req.file.filename,
        guru: user,
      };
    }
    this.pelajaran.merge(pel, Object.assign(req.body, data));
    return this.pelajaran.save(pel);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    var uid = req.body.uid,
      user = await new UserController().findOne(uid),
      data: object;
    if (req.file == undefined || req.file == null) {
      data = {
        kdPelajaran: makeid(8).toUpperCase(),
        guru: user,
      };
    } else {
      data = {
        kdPelajaran: makeid(8).toUpperCase(),
        gambar: req.file.filename,
        guru: user,
      };
    }
    // console.log(data);
    // console.log(Object.assign(req.body, data));
    var save = this.pelajaran.save(Object.assign(req.body, data));
    save
      .then(async (result) => {
        if (result !== null && result !== undefined) {
          var pelajaran = await new UserController().findPelajaran(uid);
          res.send(<ResultBack>{
            status: 200,
            data: pelajaran,
          });
        }
        res.send(<ResultBack>{
          status: 500,
          data: {name: 'Error', error: 'Tidak ada Id yang sama dalam database!'},
        });
      })
      .catch((err) => {
        res.send(<ResultBack>{
          status: 500,
          data: {name: 'Error', error: err.message},
        });
      });
  }

  async findOne(kd: string) {
    return this.pelajaran.findOne(kd, {relations: ['guru', 'kuises']});
  }

  async findKuis(kd: string) {
    const pel = await this.pelajaran.findOne(kd, {relations: ['kuises']});
    return pel.kuises;
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    let pel = await this.pelajaran.findOne(req.params.kd);
    return this.pelajaran.remove(pel);
  }
}
