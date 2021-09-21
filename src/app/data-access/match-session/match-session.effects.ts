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
  searchMatchSessions,
  searchMatchSessionsHostedSuccess,
  searchMatchSessionsInvitedSuccess,
} from './match-session.actions';
import { ScopeSearchMatchSession } from './match-session.models';
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

  searchMatchSessions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(searchMatchSessions),
        switchMap(({ userId, scope }) => {
          this.matchSessionStore.update((state) => ({
            ...state,
            matchSessionsLoading: true,
          }));
          if (scope === ScopeSearchMatchSession.Hosted) {
            return this.matchSessionService
              .search(userId, scope)
              .pipe(
                map((matchSessions) =>
                  searchMatchSessionsHostedSuccess({ matchSessions })
                )
              );
          } else if (scope === ScopeSearchMatchSession.Invited) {
            return this.matchSessionService
              .search(userId, scope)
              .pipe(
                map((matchSessions) =>
                  searchMatchSessionsInvitedSuccess({ matchSessions })
                )
              );
          }
        })
      ),
    { dispatch: true }
  );

  @Effect()
  searchMatchSessionsHostedSuccess$ = this.actions$.pipe(
    ofType(searchMatchSessionsHostedSuccess),
    tap(({ matchSessions }) => {
      return this.matchSessionStore.update((state) => ({
        ...state,
        matchSessionsLoading: false,
        hostedMatchSessions: matchSessions,
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
