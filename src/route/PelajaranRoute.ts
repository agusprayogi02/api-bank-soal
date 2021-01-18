import {PelajaranController} from '../controller/PelajaranController'
import {Route} from '../routes'

export const PelajaranRoute = <Route[]>[
  {
    method: 'get',
    route: '/pelajaran',
    controller: PelajaranController,
    action: 'all',
  },
]
