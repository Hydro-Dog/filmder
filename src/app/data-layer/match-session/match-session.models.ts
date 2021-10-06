import { ID } from '@datorama/akita';
import { User } from '../user/user.models';

//CO - create object
export interface MatchSessionCO {
  region: string;
  lang: string;
  matchLimit: number;
  category: string;
  guestId: number;
}

export interface MatchSession {
  id: number;
  region: string;
  category: string;
  host: User;
  guest: User;
  hostCurrentPage: number;
  guestCurrentPage: number;
  hostLikedMovies: number[];
  guestLikedMovies: number[];
  filterParams: string;
  matchedMoviesIds: number[];
  matchLimit: number;
  accepted: boolean;
  declined: boolean;
}

export enum ScopeSearchMatchSession {
  Hosted = 'hosted',
  Invited = 'invites',
}

export enum MatchSessionSocketEvents {
  PushNewMatchSession = 'push_new_match_session',
  RegisterNewListener = 'register_listener',
}
