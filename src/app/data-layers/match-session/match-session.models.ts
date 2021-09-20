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
  hostId: number;
  guestId: number;
  hostCurrentPage: number;
  guestCurrentPage: number;
  hostLikedMovies: number[];
  guestLikedMovies: number[];
  filterParams: string;
  matchedMoviesIds: number[];
  matchesLimit: number;
  acceptedByGuest: boolean;
}
