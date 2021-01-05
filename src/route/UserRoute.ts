import {Router, Request, Response, NextFunction} from 'express'
import {loginValidate} from '../middleware/UserMiddleware'
import {UserController} from '../controller/UserController'
import {error} from '../type'

var app: Router = Router()
app.post('/login', loginValidate, (req: Request, res: Response, next: NextFunction) => {
  var result = new UserController().login(req, res, next)
  if (result instanceof Promise) {
    result.then((result) =>
      result !== null && result !== undefined
        ? res.send(result)
        : res.status(500).send(error.LOGIN),
    )
  } else if (result !== null && result !== undefined) {
    res.json(result)
  } else {
    res.status(500).send(error.LOGIN)
  }
})

app.post('/:id', loginValidate, (req: Request, res: Response, next: NextFunction) => {
  var result = new UserController().save(req, res, next)
  if (result instanceof Promise) {
    result.then((result) =>
      result !== null && result !== undefined
        ? res.send(result)
        : res.status(500).send(error.LOGIN),
    )
  } else if (result !== null && result !== undefined) {
    res.json(result)
  } else {
    res.status(500).send(error.LOGIN)
  }
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
