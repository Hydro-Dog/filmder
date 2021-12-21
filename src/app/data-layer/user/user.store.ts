import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { MatchSessionEntity } from '../match-session/match-session.models';

export interface UserState {
  currentUser: any | null;
  error: any;
  currentUserLoading: boolean;
  currentUserMatches: MatchSessionEntity[];
}

export function createInitialState(): UserState {
  return {
    currentUser: null,
    error: null,
    currentUserLoading: false,
    currentUserMatches: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
