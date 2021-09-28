import { ID } from '@datorama/akita';
import { User } from '../user/user.models';

//CO - create object
export interface MatchSessionCO {
  lang: string;
  matchLimit: number;
  category: string;
  guestId: number;
}

export interface MatchSession {
  id: number;
  region: string;
  category: string;
  //TODO: find a way to use aliases for relations in typeORM
  hostId: User;
  hostName: string;
  guestId: User;
  guestName: string;
  hostCurrentPage: number;
  guestCurrentPage: number;
  hostLikedMovies: number[];
  guestLikedMovies: number[];
  filterParams: string;
  matchedMoviesIds: number[];
  matchesLimit: number;
  accepted: boolean;
}

export enum ScopeSearchMatchSession {
  Hosted = 'hosted',
  Invited = 'invites',
}
