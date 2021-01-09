import {SekolahController} from '../controller/SekolahController'

export const SekolahRoute = [
  {
    method: 'get',
    route: '/sekolah',
    controller: SekolahController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/sekolah/get',
    controller: SekolahController,
    action: 'getAll',
  },
  {
    method: 'get',
    route: '/sekolah/:id',
    controller: SekolahController,
    action: 'find',
  },
  {
    method: 'post',
    route: '/sekolah/save',
    controller: SekolahController,
    action: 'save',
  },
]
