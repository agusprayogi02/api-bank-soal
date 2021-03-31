import {Router} from 'express';
import {KuisController} from '../controller';
import {upload} from '../multer';
import {Route} from '../routes';

const app: Router = Router();

app.post('/create', upload('kuis', 'image'), (req, res, next) =>
  new KuisController().create(req, res, next),
);

export const KuisRoute = <Route[]>[
  {
    method: 'get',
    route: '/kuis',
    controller: KuisController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/kuis/one/:kd',
    controller: KuisController,
    action: 'one',
  },
  {
    method: 'get',
    route: '/kuis/:kd',
    controller: KuisController,
    action: 'kuisByPel',
  },
];

export default app;
