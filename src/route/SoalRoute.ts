import {SoalController} from '../controller/SoalController'
import {Route} from '../routes'

export const SoalRoute = <Route[]>[
  {
    method: 'get',
    route: '/soal',
    controller: SoalController,
    action: 'all',
  },
]
