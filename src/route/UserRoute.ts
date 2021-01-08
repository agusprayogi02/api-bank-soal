import {Router, Request, Response, NextFunction} from 'express'
import {loginValidation} from '../middleware/UserMiddleware'
import {UserController} from '../controller/UserController'
import {validate} from 'express-validation'
import {error} from '../type'

var app: Router = Router()
app.post(
  '/login',
  validate(loginValidation, {}, {}),
  (req: Request, res: Response, next: NextFunction) => {
    new UserController().login(req, res, next)
  },
)

app.post('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserController().save(req, res, next)
})

export const UserRoute = [
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
]

export default app
