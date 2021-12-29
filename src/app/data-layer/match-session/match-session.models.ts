import { ID } from '@datorama/akita';
import { Film } from '../film/film.models';
import { UserEntity } from '../user/user.models';

export enum MatchSessionStatus {
  Pending = 0,
  Accepted = 1,
  Declined = 2,
  Completed = 3,
}

export class GetMatchSessionDTO {
  matchSessionId?: string;
  userId?: string;
}

export class CreateMatchSessionDTO {
  hostId: string;
  guestId: string;
  matchLimit: number;
  category: FilmCategories;
}

export class MatchSessionEntity {
  id: string;
  created: Date;
  updated: Date;
  category?: string;
  filmsSequence: string[];
  host: UserEntity;
  guest: UserEntity;
  filterParams: string;
  matchedMovies?: string[];
  matchLimit: number;
  status: MatchSessionStatus;
  hostCurrentFilmIndex?: number;
  guestCurrentFilmIndex?: number;
  hostLikedFilms?: string[];
  guestLikedFilms?: string[];
  hostLikedFilmIndex: number;
  guestLikedFilmIndex: number;
  matched?: boolean;
}

export class UpdateMatchSessionStatusDTO {
  matchSessionId: string;
  status: MatchSessionStatus;
}

export class SwipeMatchSessionStatusDTO {
  matchSessionId: string;
  swipe: 'left' | 'right';
  film: string;
  hostId: string;
  guestId: string;
}

export enum FilmCategories {
  Popular = 'popular',
  // NowPlaying = 'now_playing',
  TopRated = 'top_rated',
  Upcoming = 'upcoming',
}

//=========================================================================

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
  host: UserEntity;
  guest: UserEntity;
  lang: string;
  hostCurrentFilmIndex: number;
  guestCurrentFilmIndex: number;
  hostLikedFilms: number[];
  guestLikedFilms: number[];
  hostLikedFilmIndex: number;
  guestLikedFilmIndex: number;
  filterParams: string;
  matchedMoviesJSON: string[];
  matchLimit: number;
  accepted: boolean;
  declined: boolean;
  filmsMatchTookPlace: boolean;
  completed: boolean;
}

// export enum ScopeSearchMatchSession {
//   Hosted = 'hosted',
//   Invited = 'invites',
// }

export enum MatchSessionSocketEvents {
  ServerMessage = 'server_message',
  MatchSessionChanges = 'match_session_changes',
  RegisterNewListener = 'register_listener',
  LikesMatched = 'likes-matched',
}

export enum MatchSessionChangesEvents {
  Add = 'add',
  ChangeStatus = 'change_status',
  FilmsMatch = 'films_match',
}
