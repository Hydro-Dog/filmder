import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { MatchSession } from './match-session.models';

export interface MatchSessionState {
  matchSessions: MatchSession[];
  matchSessionsLoading: boolean;
  currentMatchSession: MatchSession;
  error: any;
}

export function createInitialState(): MatchSessionState {
  return {
    matchSessions: [],
    matchSessionsLoading: false,
    currentMatchSession: null,
    error: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'matchSession' })
export class MatchSessionStore extends Store<MatchSessionState> {
  constructor() {
    super(createInitialState());
  }
}
