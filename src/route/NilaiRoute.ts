import {NilaiController} from '../controller/NilaiController'
import {Route} from '../routes'

export const NilaiRoute = <Route[]>[
  {
    method: 'get',
    route: '/nilai',
    controller: NilaiController,
    action: 'all',
  },
]
