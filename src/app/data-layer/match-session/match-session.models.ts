import { ID } from '@datorama/akita';
import { Film } from '../film/film.models';
import { User } from '../user/user.models';

//CO - create object
export interface MatchSessionCO {
  matchLimit: number;
  category: string;
  guestId: number;
}

export interface MatchSession {
  id: number;
  region: string;
  category: string;
  filmsSequenceJson: string[];
  filmsSequence: Film[];
  host: User;
  guest: User;
  lang: string;
  hostCurrentFilmIndex: number;
  guestCurrentFilmIndex: number;
  hostLikedFilms: number[];
  guestLikedFilms: number[];
  hostLikedFilmIndex: number;
  guestLikedFilmIndex: number;
  filterParams: string;
  matchedMoviesIds: number[];
  matchLimit: number;
  accepted: boolean;
  declined: boolean;
  filmsMatchTookPlace: boolean;
  completed: boolean;
}

export enum ScopeSearchMatchSession {
  Hosted = 'hosted',
  Invited = 'invites',
}

export enum MatchSessionSocketEvents {
  MatchSessionChanges = 'match_session_changes',
  RegisterNewListener = 'register_listener',
}

export enum MatchSessionChangesEvents {
  Add = 'add',
  ChangeStatus = 'change_status',
}
