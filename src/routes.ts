import {UserRoute} from './route/UserRoute'
import {SekolahRoute} from './route/SekolahRoute'
import {PelajaranRoute} from './route/PelajaranRoute'
import {NilaiRoute} from './route/NilaiRoute'
import {JawabanRoute} from './route/JawabanRoute'
import {SoalRoute} from './route/SoalRoute'

export interface Route {
  method: string
  route: string
  controller: any
  action: string
}

export const Routes: Array<Route> = [].concat(
  UserRoute,
  SekolahRoute,
  PelajaranRoute,
  NilaiRoute,
  JawabanRoute,
  SoalRoute,
)
