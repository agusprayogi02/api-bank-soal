import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Request, Response} from 'express';
import * as cors from 'cors';
import {Routes} from './routes';
import userRoute from './route/UserRoute';
import {ValidationError} from 'express-validation';
import * as Http from 'http';
import {ResultBack} from './resultBack';
import PelajaranRoute from './route/PelajaranRoute';

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    // app.use(cors({origin: 'http://localhost:3000/'}))
    app.use(cors());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(<ResultBack>{
                  status: 200,
                  data: result,
                })
              : res.send(<ResultBack>{
                  status: 500,
                  data: {name: 'Error', error: 'Tidak ada Id yang sama dalam database!'},
                }),
          );
        } else if (result !== null && result !== undefined) {
          res.json(<ResultBack>{
            status: 200,
            data: result,
          });
        } else {
          res.send(<ResultBack>{
            status: 500,
            data: {name: 'Error', error: 'Tidak ada Id yang sama dalam database!'},
          });
        }
      });
    });
    app.use('/users', userRoute);
    app.use('/pelajaran', PelajaranRoute);
    app.use(function (err, req, res, next) {
      if (err instanceof ValidationError) {
        return res.send(<ResultBack>{
          status: err.statusCode,
          data: {name: err.name, error: err.message},
        });
      }

      return res.json(<ResultBack>{
        status: err.statusCode,
        data: {name: err.name, error: err.message},
      });
    });

    // setup express app here
    // ...
    var PORT = '4000' || process.env.PORT;
    app.set('port', PORT);
    // start express server
    const server = Http.createServer(app);
    server.listen(PORT);

    // insert new users for test
    // var sekolah = await connection.manager.save(
    //   connection.manager.create(Sekolah, {
    //     nama: 'Kanesa',
    //     kelas: 12,
    //     jurusan: 'RPL 2',
    //     kode: 'KSNU78',
    //   }),
    // );
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     uid: 'kldaeica',
    //     firstName: 'Agus',
    //     lastName: 'Prayogi',
    //     email: 'agus21apy@gmail.com',
    //     jk: Jk.L,
    //     password: 'Akubisa-1',
    //     role: UserRole.ADMIN,
    //     sekolah: sekolah,
    //   }),
    // );

    console.log(
      `Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`,
    );
  })
  .catch((error) => console.log(error));
