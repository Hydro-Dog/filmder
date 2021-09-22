import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  createMatchSession,
  createMatchSessionSuccess,
  getMatchSessionsByUserId,
  getMatchSessionsByUserIdSuccess,
  searchMatchSessionsInvitedSuccess,
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

  getMatchSessionsByUserId$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getMatchSessionsByUserId),
        switchMap(({ userId }) => {
          this.matchSessionStore.update((state) => ({
            ...state,
            matchSessionsLoading: true,
          }));

          return this.matchSessionService
            .getMatchSessionsByUserId(userId)
            .pipe(
              map((matchSessions) =>
                getMatchSessionsByUserIdSuccess({ matchSessions })
              )
            );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  getMatchSessionsByUserIdSuccess$ = this.actions$.pipe(
    ofType(getMatchSessionsByUserIdSuccess),
    tap(({ matchSessions }) => {
      return this.matchSessionStore.update((state) => ({
        ...state,
        matchSessionsLoading: false,
        matchSessions,
      }));
    })
  );

  @Effect()
  searchMatchSessionsInvitedSuccess$ = this.actions$.pipe(
    ofType(searchMatchSessionsInvitedSuccess),
    tap(({ matchSessions }) => {
      return this.matchSessionStore.update((state) => ({
        ...state,
        matchSessionsLoading: false,
        invitedMatchSessions: matchSessions,
      }));
    })
  );
}
