import {UserRoute} from './route/UserRoute'
import {SekolahRoute} from './route/SekolahRoute'

export interface Route {
  method: string
  route: string
  controller: any
  action: string
}

export const Routes: Array<Route> = [].concat(UserRoute, SekolahRoute)
