import {Router, Request, Response, NextFunction} from 'express';
import {loginValidation} from '../middleware/UserMiddleware';
import {UserController} from '../controller';
import {validate} from 'express-validation';
import {Route} from '../routes';

const app: Router = Router();
app.post(
  '/login',
  validate(loginValidation, {}, {}),
  (req: Request, res: Response, next: NextFunction) => {
    new UserController().login(req, res, next);
  },
);

app.post('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserController().save(req, res, next);
});

export const UserRoute = <Route[]>[
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/users/pelajaran/:id',
    controller: UserController,
    action: 'pelajaran',
  },
];

export default app;
