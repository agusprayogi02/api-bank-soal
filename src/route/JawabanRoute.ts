import {JawabanController} from '../controller/JawabanController'
import {Route} from '../routes'

export const JawabanRoute = <Route[]>[
  {
    method: 'get',
    route: '/jawaban',
    controller: JawabanController,
    action: 'all',
  },
]
