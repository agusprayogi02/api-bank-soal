import {NextFunction, Request, Response, Router} from 'express';
import {PelajaranController} from '../controller/PelajaranController';
import {upload} from '../multer';
import {ResultBack} from '../resultBack';
import {Route} from '../routes';

const app: Router = Router();

app.post(
  '/create',
  upload('pelajaran', 'image'),
  (err, req: Request, res: Response, next: NextFunction) =>
    new PelajaranController().create(err, req, res, next),
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
];

export default app;
