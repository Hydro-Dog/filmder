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
  deleteMatchSession,
  deleteMatchSessionSuccess,
  getCurrentMatchSession,
  getCurrentMatchSessionSuccess,
  getMatchSessionsByUserId,
  getMatchSessionsByUserIdSuccess,
  socketGetMatchSessionSuccess,
  updateMatchSession,
  updateMatchSessionSuccess,
} from './match-session.actions';
import { MatchSessionChangesEvents } from './match-session.models';
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

  updateMatchSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateMatchSession),
        switchMap(({ matchSession }) => {
          this.matchSessionStore.update((state) => ({
            ...state,
            matchSessionsLoading: true,
          }));
          return this.matchSessionService
            .update(matchSession)
            .pipe(
              map((matchSession) => updateMatchSessionSuccess({ matchSession }))
            );
        })
      ),
    { dispatch: true }
  );

  deleteMatchSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteMatchSession),
        switchMap(({ id }) => {
          this.matchSessionStore.update((state) => ({
            ...state,
            matchSessionsLoading: true,
          }));
          return this.matchSessionService
            .delete(id)
            .pipe(map((matchSession) => deleteMatchSessionSuccess({ id })));
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

  getCurrentMatchSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCurrentMatchSession),
        switchMap(({ matchSessionId }) => {
          this.matchSessionStore.update((state) => ({
            ...state,
            matchSessionsLoading: true,
          }));

          return this.matchSessionService
            .getMatchSessionById(matchSessionId)
            .pipe(
              map((currentMatchSession) =>
                getCurrentMatchSessionSuccess({ currentMatchSession })
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
  getCurrentMatchSessionSuccess$ = this.actions$.pipe(
    ofType(getCurrentMatchSessionSuccess),
    tap(({ currentMatchSession }) => {
      return this.matchSessionStore.update((state) => ({
        ...state,
        matchSessionsLoading: false,
        currentMatchSession,
      }));
    })
  );

  @Effect()
  updateMatchSessionSuccess$ = this.actions$.pipe(
    ofType(updateMatchSessionSuccess),
    tap(({ matchSession }) => {
      return this.matchSessionStore.update((state) => {
        const idx = state.matchSessions.findIndex(
          (item) => item.id === matchSession.id
        );

        const matchSessions = [...state.matchSessions];
        matchSessions[idx] = matchSession;
        return {
          ...state,
          matchSessionsLoading: false,
          matchSessions,
        };
      });
    })
  );

  @Effect()
  deleteMatchSessionSuccess$ = this.actions$.pipe(
    ofType(deleteMatchSessionSuccess),
    tap(({ id }) => {
      return this.matchSessionStore.update((state) => {
        const idx = state.matchSessions.findIndex(
          (item) => item.id.toString() === id
        );

        const matchSessions = state.matchSessions.splice(idx, 1);
        return {
          ...state,
          matchSessionsLoading: false,
          matchSessions,
        };
      });
    })
  );

  @Effect()
  socketGetMatchSessionsInvitedSuccess$ = this.actions$.pipe(
    ofType(socketGetMatchSessionSuccess),
    tap(({ matchSession, event }) => {
      return this.matchSessionStore.update((state) => {
        let matchSessions = [];
        switch (event) {
          case MatchSessionChangesEvents.Add:
            matchSessions = [...state.matchSessions, matchSession];
            break;

          case MatchSessionChangesEvents.ChangeStatus:
            const idx = state.matchSessions.findIndex(
              (item) => item.id === matchSession.id
            );
            matchSessions = [...state.matchSessions];
            matchSessions.splice(idx, 1, matchSession);
            break;

          default:
            break;
        }

        return {
          ...state,
          matchSessionsLoading: false,
          matchSessions,
        };
      });
    })
  );
}
