import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { startCase } from 'lodash';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  createMatchSession,
  createMatchSessionSuccess,
} from './match-session.actions';
import { MatchSessionService } from './match-session.service';
import { MatchSessionStore } from './match-session.store';

@Injectable()
export class MatchSessionEffects {
  type: ActionType;
  constructor(
    private actions$: Actions,
    private matchSessionService: MatchSessionService,
    private matchSessionStore: MatchSessionStore
  ) {}

  createMatchSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createMatchSession),
        switchMap(({ matchSession }) => {
          console.log('createMatchSession!!!');
          this.matchSessionStore.update((state) => ({
            ...state,
            matchSessionsLoading: true,
          }));
          return this.matchSessionService
            .create(matchSession)
            .pipe(
              map((matchSession) => createMatchSessionSuccess({ matchSession }))
            );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  getGameModesSuccess$ = this.actions$.pipe(
    ofType(createMatchSessionSuccess),
    tap(({ matchSession }) => {
      return this.matchSessionStore.update((state) => ({
        ...state,
        matchSessionsLoading: false,
        matchSessions: [matchSession, ...state.matchSessions],
      }));
    })
  );
}
