import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MatchSessionState, MatchSessionStore } from './match-session.store';

@Injectable({ providedIn: 'root' })
export class MatchSessionQuery extends Query<MatchSessionState> {
  // TODO(vbabaev): change string selectiors to enums
  selectMatchSessions$ = this.select('matchSessions');
  selectError$ = this.select('error');
  selectGameModesLoading$ = this.select('matchSessionsLoading');

  constructor(protected store: MatchSessionStore) {
    super(store);
  }
}
