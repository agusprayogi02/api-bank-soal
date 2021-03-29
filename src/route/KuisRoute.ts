import {KuisController} from '../controller';
import {Route} from '../routes';

export const KuisRoute = <Route[]>[
  {
    method: 'get',
    route: '/kuis',
    controller: KuisController,
    action: 'all',
  },
];
