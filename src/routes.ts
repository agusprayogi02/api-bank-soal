import {
  UserRoute,
  SekolahRoute,
  PelajaranRoute,
  NilaiRoute,
  JawabanRoute,
  SoalRoute,
} from './route';

export interface Route {
  method: string;
  route: string;
  controller: any;
  action: string;
}

export const Routes: Array<Route> = [].concat(
  UserRoute,
  SekolahRoute,
  PelajaranRoute,
  NilaiRoute,
  JawabanRoute,
  SoalRoute,
);
