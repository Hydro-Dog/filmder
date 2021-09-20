import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { createMatchSession } from './match-session.actions';
import { MatchSessionCO } from './match-session.models';

@Injectable({ providedIn: 'root' })
export class MatchSessionFacade {
  constructor(
    // private gameModesQuery: GameModesQuery,
    private actions: Actions
  ) {}

  createMatchSession(matchSession: MatchSessionCO) {
    console.log('matchSession: ', matchSession);
    this.actions.dispatch(createMatchSession({ matchSession }));
  }
}
