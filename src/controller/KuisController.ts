import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Kuis} from '../entity';
import {ResultBack} from '../resultBack';
import {makeid} from '../utils';
import {PelajaranController} from './PelajaranController';

export class KuisController {
  private kuis = getRepository(Kuis);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.kuis.find({relations: ['pelajaran', 'nilais', 'soals']});
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.kuis.findOne(req.params.id, {relations: ['pelajaran', 'nilais', 'soals']});
  }

  async kuisByPel(req: Request, res: Response, next: NextFunction) {
    return new PelajaranController().findKuis(req.params.kd);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    var kd = req.body.kd,
      pelajaran = await new PelajaranController().findOne(kd),
      data: object;
    if (req.file == undefined || req.file == null) {
      data = {
        kd: makeid(8).toUpperCase(),
        pelajaran: pelajaran,
      };
    } else {
      data = {
        kd: makeid(8).toUpperCase(),
        gambar: req.file.filename,
        pelajaran: pelajaran,
      };
    }
    // console.log(data);
    // console.log(Object.assign(req.body, data));
    var save = this.kuis.save(Object.assign(req.body, data));
    save
      .then(async (result) => {
        if (result !== null && result !== undefined) {
          var pelajaran = await new PelajaranController().findKuis(kd);
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
}
