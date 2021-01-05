import 'reflect-metadata'
import {createConnection} from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import {Request, Response} from 'express'
import * as cors from 'cors'
import {Routes} from './routes'
import {Sekolah} from './entity/Sekolah'
import {User, UserRole} from './entity/User'
import userRoute from './route/UserRoute'

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
   // app.use(cors({origin: 'http://localhost:3000/'}))
    app.use(cors())

    // register express routes from defined application routes
    Routes.forEach((route) => {
      ;(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : res.status(500).send('Tidak ada Id yang sama dalam database!'),
          )
        } else if (result !== null && result !== undefined) {
          res.json(result)
        } else {
          res.status(500).send('Tidak ada Id yang sama dalam database!')
        }
      })
    })
    app.use('/users', userRoute)

    // setup express app here
    // ...
    var PORT = 4000
    // start express server
    app.listen(PORT)

    // insert new users for test
    // await connection.manager.save(
    //   connection.manager.create(Sekolah, {
    //     nama: 'Kanesa',
    //     jurusan: 'RPL 2',
    //   }),
    // )
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: 'Phantom',
    //     lastName: 'Assassin',
    //     email: 'agus',
    //     password: '123456',
    //     age: 24,
    //     kelas: 12,
    //     role:UserRole.ADMIN
    //   }),
    // )

    console.log(
      `Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`,
    )
  })
  .catch((error) => console.log(error))
