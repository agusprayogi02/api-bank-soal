import {PelajaranController} from '../controller/PelajaranController'

export const PelajaranRoute = [
  {
    method: 'get',
    route: '/pelajaran',
    controller: PelajaranController,
    action: 'all',
  },
]
