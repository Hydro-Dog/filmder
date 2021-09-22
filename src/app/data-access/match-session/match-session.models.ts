import { ID } from '@datorama/akita';

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
  hostId: string;
  guestId: string;
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
