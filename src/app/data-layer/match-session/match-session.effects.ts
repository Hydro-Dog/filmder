import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { stat } from 'fs';
import { throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  createMatchSession,
  createMatchSessionSuccess,
  deleteMatchSession,
  deleteMatchSessionSuccess,
  getCurrentMatchSession,
  getCurrentMatchSessionSuccess,
  getMatchSessionsByUserId,
  getMatchSessionsByUserIdSuccess,
  socketAddMatchSessionSuccess,
  socketChangeMatchSessionSuccess,
  socketFilmsMatchSuccess,
  swipe,
  swipeSuccess,
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
  getCurrentMatchSessionSuccess$ = this.actions$.pipe(
    ofType(getCurrentMatchSessionSuccess),
    tap(({ currentMatchSession }) => {
      const filmsSequence = currentMatchSession.filmsSequenceJson.map(
        (filmJson) => JSON.parse(filmJson)
      );
      console.timeEnd('filmJson------');
      return this.matchSessionStore.update((state) => ({
        ...state,
        matchSessionsLoading: false,
        currentMatchSession: { ...currentMatchSession, filmsSequence },
      }));
    })
  );

  swipeRight$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(swipe),
        switchMap(({ matchSessionId, filmJSON, swipeDirection }) => {
          this.matchSessionStore.update((state) => ({
            ...state,
            currentMatchSessionLoading: true,
          }));

          return this.matchSessionService
            .swipe(matchSessionId, filmJSON, swipeDirection)
            .pipe(
              map((currentMatchSession) =>
                swipeSuccess({ currentMatchSession })
              )
            );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  swipeRightSuccess$ = this.actions$.pipe(
    ofType(swipeSuccess),
    tap(({ currentMatchSession }) => {
      const filmsSequence = currentMatchSession.filmsSequenceJson.map(
        (filmJson) => JSON.parse(filmJson)
      );

      return this.matchSessionStore.update((state) => ({
        ...state,
        currentMatchSessionLoading: false,
        currentMatchSession: { ...currentMatchSession, filmsSequence },
      }));
    })
  );

  // sockets -----------------------------------------------------

  @Effect()
  socketAddMatchSessionSuccess$ = this.actions$.pipe(
    ofType(socketAddMatchSessionSuccess),
    tap(({ matchSession }) => {
      return this.matchSessionStore.update((state) => ({
        ...state,
        matchSessions: [...state.matchSessions, matchSession],
      }));
    })
  );

  @Effect()
  socketChangeMatchSessionSuccess$ = this.actions$.pipe(
    ofType(socketChangeMatchSessionSuccess),
    tap(({ matchSession }) => {
      return this.matchSessionStore.update((state) => {
        const matchSessionIndex = state.matchSessions.findIndex(
          ({ id }) => id === matchSession.id
        );
        const matchSessionsArray = [...state.matchSessions];
        matchSessionsArray[matchSessionIndex] = matchSession;

        return {
          ...state,
          matchSessions: matchSessionsArray,
        };
      });
    })
  );

  @Effect()
  socketFilmsMatchSuccess$ = this.actions$.pipe(
    ofType(socketFilmsMatchSuccess),
    tap(({ filmJSON }) => {
      return this.matchSessionStore.update((state) => {
        return {
          ...state,
          currentMatchSession: {
            ...state.currentMatchSession,
            matchedMoviesJSON: [
              ...state.currentMatchSession.matchedMoviesJSON,
              filmJSON,
            ],
          },
        };
      });
    })
  );
  socketFilmsMatchSuccess;
}
