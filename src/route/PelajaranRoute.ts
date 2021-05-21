import {NextFunction, Request, Response, Router} from 'express';
import {PelajaranController} from '../controller/PelajaranController';
import {upload} from '../multer';
import {ResultBack} from '../resultBack';
import {Route} from '../routes';
import {handlingResult} from '../utils';

const app: Router = Router();

app.post(
  '/create',
  upload('pelajaran', 'image'),
  (req: Request, res: Response, next: NextFunction) =>
    new PelajaranController().create(req, res, next),
);

app.put('/update', upload('pelajaran', 'image'), (req, res, next) => {
  var result = new PelajaranController().update(req, res, next);
  handlingResult(result, req, res, next);
});

app.post(
  '/upload',
  upload('pelajaran', 'image'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);
    res.json({file: req.file.path});
  },
);

export const PelajaranRoute = <Route[]>[
  {
    method: 'get',
    route: '/pelajaran',
    controller: PelajaranController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/pelajaran/:id',
    controller: PelajaranController,
    action: 'one',
  },
  {
    method: 'delete',
    route: '/pelajaran/:kd',
    controller: PelajaranController,
    action: 'remove',
  },
];

export default app;
