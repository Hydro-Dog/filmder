import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { MatchSession, MatchSessionEntity } from './match-session.models';

export interface MatchSessionState {
  // matchSessions: MatchSession[];
  // matchSessionsLoading: boolean;
  currentMatchSession: MatchSessionEntity;
  currentMatchSessionLoading: boolean;
  // error: any;
}

export function createInitialState(): MatchSessionState {
  return {
    // matchSessions: [],
    // matchSessionsLoading: false,
    currentMatchSession: null,
    currentMatchSessionLoading: false,
    // error: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'matchSession' })
export class MatchSessionStore extends Store<MatchSessionState> {
  constructor() {
    super(createInitialState());
  }
}
