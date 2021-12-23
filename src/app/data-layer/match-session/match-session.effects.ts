import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserStore } from '../user/user.store';
import {
  updateMatchSessionStatus,
  updateMatchSessionStatusSuccess,
} from './match-session.actions';
import { MatchSessionStatus } from './match-session.models';

import { MatchSessionService } from './match-session.service';
import { MatchSessionStore } from './match-session.store';

@Injectable()
export class MatchSessionEffects {
  type: ActionType;
  constructor(
    private actions$: Actions,
    private matchSessionService: MatchSessionService,
    private matchSessionStore: MatchSessionStore,
    private userStore: UserStore
  ) {}

  updateMatchSessionStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateMatchSessionStatus),
        switchMap(({ data }) => {
          return this.matchSessionService
            .updateStatus(data)
            .pipe(
              map((matchSession) =>
                updateMatchSessionStatusSuccess({ matchSession })
              )
            );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  updateMatchSessionStatusSuccess$ = this.actions$.pipe(
    ofType(updateMatchSessionStatusSuccess),
    tap(({ matchSession }) => {
      return this.userStore.update((state) => {
        const index = state.currentUserMatches.findIndex(
          (item) => item.id === matchSession.id
        );
        let currentUserMatches = [...state.currentUserMatches];

        if (matchSession.status === MatchSessionStatus.Declined) {
          currentUserMatches = currentUserMatches.filter(
            ({ id }) => id !== matchSession.id
          );
        } else {
          currentUserMatches[index].status = matchSession.status;
        }

        return {
          ...state,
          currentUserMatches,
        };
      });
    })
  );

  // @Effect()
  // setCurrentMatchSessionSuccess$ = this.actions$.pipe(
  //   ofType(setCurrentMatchSessionSuccess),
  //   tap(({ matchSession }) => {
  //     return this.matchSessionStore.update((state) => {
  //       const filmsSequence = matchSession.filmsSequenceJson.map((filmJson) =>
  //         JSON.parse(filmJson)
  //       );

  //       return {
  //         ...state,
  //         matchSessionsLoading: false,
  //         currentMatchSession: { ...matchSession, filmsSequence },
  //       };
  //     });
  //   })
  // );

  // updateMatchSession$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(updateMatchSession),
  //       switchMap(({ matchSession }) => {
  //         this.matchSessionStore.update((state) => ({
  //           ...state,
  //           matchSessionsLoading: true,
  //         }));
  //         return this.matchSessionService
  //           .update(matchSession)
  //           .pipe(
  //             map((matchSession) => updateMatchSessionSuccess({ matchSession }))
  //           );
  //       })
  //     ),
  //   { dispatch: true }
  // );

  // @Effect()
  // updateMatchSessionSuccess$ = this.actions$.pipe(
  //   ofType(updateMatchSessionSuccess),
  //   tap(({ matchSession }) => {
  //     return this.matchSessionStore.update((state) => {
  //       const idx = state.matchSessions.findIndex(
  //         (item) => item.id === matchSession.id
  //       );

  //       const matchSessions = [...state.matchSessions];
  //       matchSessions[idx] = matchSession;
  //       return {
  //         ...state,
  //         matchSessionsLoading: false,
  //         matchSessions,
  //       };
  //     });
  //   })
  // );

  // deleteMatchSession$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(deleteMatchSession),
  //       switchMap(({ matchSessionId }) => {
  //         this.matchSessionStore.update((state) => ({
  //           ...state,
  //           matchSessionsLoading: true,
  //         }));
  //         return this.matchSessionService
  //           .delete(matchSessionId)
  //           .pipe(
  //             map((matchSessionId) =>
  //               deleteMatchSessionSuccess({ matchSessionId })
  //             )
  //           );
  //       })
  //     ),
  //   { dispatch: true }
  // );

  // @Effect()
  // deleteMatchSessionSuccess$ = this.actions$.pipe(
  //   ofType(deleteMatchSessionSuccess),
  //   tap(({ matchSessionId }) => {
  //     return this.matchSessionStore.update((state) => {
  //       const idx = state.matchSessions.findIndex(
  //         (item) => +item.id === +matchSessionId
  //       );

  //       const matchSessions = [...state.matchSessions];
  //       matchSessions.splice(idx, 1);
  //       return {
  //         ...state,
  //         matchSessionsLoading: false,
  //         matchSessions,
  //       };
  //     });
  //   })
  // );

  // getMatchSessionsByUserId$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getMatchSessionsByUserId),
  //       switchMap(({ userId }) => {
  //         this.matchSessionStore.update((state) => ({
  //           ...state,
  //           matchSessionsLoading: true,
  //         }));

  //         return this.matchSessionService
  //           .getMatchSessionsByUserId(userId)
  //           .pipe(
  //             map((matchSessions) =>
  //               getMatchSessionsByUserIdSuccess({ matchSessions })
  //             )
  //           );
  //       })
  //     ),
  //   { dispatch: true }
  // );

  // @Effect()
  // getMatchSessionsByUserIdSuccess$ = this.actions$.pipe(
  //   ofType(getMatchSessionsByUserIdSuccess),
  //   tap(({ matchSessions }) => {
  //     return this.matchSessionStore.update((state) => ({
  //       ...state,
  //       matchSessionsLoading: false,
  //       matchSessions,
  //     }));
  //   })
  // );

  // getCurrentMatchSession$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getCurrentMatchSession),
  //       switchMap(({ matchSessionId }) => {
  //         this.matchSessionStore.update((state) => ({
  //           ...state,
  //           matchSessionsLoading: true,
  //         }));

  //         return this.matchSessionService
  //           .getMatchSessionById(matchSessionId)
  //           .pipe(
  //             map((currentMatchSession) =>
  //               getCurrentMatchSessionSuccess({ currentMatchSession })
  //             )
  //           );
  //       })
  //     ),
  //   { dispatch: true }
  // );

  // @Effect()
  // getCurrentMatchSessionSuccess$ = this.actions$.pipe(
  //   ofType(getCurrentMatchSessionSuccess),
  //   tap(({ currentMatchSession }) => {
  //     const filmsSequence = currentMatchSession.filmsSequenceJson.map(
  //       (filmJson) => JSON.parse(filmJson)
  //     );
  //     return this.matchSessionStore.update((state) => ({
  //       ...state,
  //       matchSessionsLoading: false,
  //       currentMatchSession: { ...currentMatchSession, filmsSequence },
  //     }));
  //   }),
  //   catchError(() => {
  //     return this.matchSessionStore.update((state) => ({
  //       ...state,
  //       matchSessionsLoading: false,
  //       currentMatchSession: null,
  //     }));
  //   })
  // );

  // swipeRight$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(swipe),
  //       switchMap(({ matchSessionId, filmJSON, swipeDirection }) => {
  //         this.matchSessionStore.update((state) => ({
  //           ...state,
  //           currentMatchSessionLoading: true,
  //         }));

  //         return this.matchSessionService
  //           .swipe(matchSessionId, filmJSON, swipeDirection)
  //           .pipe(
  //             map((currentMatchSession) =>
  //               swipeSuccess({ currentMatchSession })
  //             )
  //           );
  //       })
  //     ),
  //   { dispatch: true }
  // );

  // @Effect()
  // swipeRightSuccess$ = this.actions$.pipe(
  //   ofType(swipeSuccess),
  //   tap(({ currentMatchSession }) => {
  //     const filmsSequence = currentMatchSession.filmsSequenceJson.map(
  //       (filmJson) => JSON.parse(filmJson)
  //     );

  //     return this.matchSessionStore.update((state) => ({
  //       ...state,
  //       currentMatchSessionLoading: false,
  //       currentMatchSession: { ...currentMatchSession, filmsSequence },
  //     }));
  //   })
  // );

  // @Effect()
  // resetStore$ = this.actions$.pipe(
  //   ofType(resetStore),
  //   tap(() => {
  //     return this.matchSessionStore.update((state) => {
  //       return {
  //         ...state,
  //         matchSessions: [],
  //         currentMatchSession: null,
  //       };
  //     });
  //   })
  // );

  // sockets -----------------------------------------------------

  // @Effect()
  // socketAddMatchSessionSuccess$ = this.actions$.pipe(
  //   ofType(socketAddMatchSessionSuccess),
  //   tap(({ matchSession }) => {
  //     return this.matchSessionStore.update((state) => ({
  //       ...state,
  //       matchSessions: [...state.matchSessions, matchSession],
  //     }));
  //   })
  // );

  // @Effect()
  // socketChangeMatchSessionSuccess$ = this.actions$.pipe(
  //   ofType(socketChangeMatchSessionSuccess),
  //   tap(({ matchSession }) => {
  //     return this.matchSessionStore.update((state) => {
  //       const matchSessionIndex = state.matchSessions.findIndex(
  //         ({ id }) => id === matchSession.id
  //       );
  //       const matchSessionsArray = [...state.matchSessions];
  //       matchSessionsArray[matchSessionIndex] = matchSession;

  //       return {
  //         ...state,
  //         matchSessions: matchSessionsArray,
  //       };
  //     });
  //   })
  // );

  // @Effect()
  // socketFilmsMatchSuccess$ = this.actions$.pipe(
  //   ofType(socketFilmsMatchSuccess),
  //   tap(({ filmJSON }) => {
  //     return this.matchSessionStore.update((state) => {
  //       return {
  //         ...state,
  //         currentMatchSession: {
  //           ...state.currentMatchSession,
  //           matchedMoviesJSON: [
  //             ...state.currentMatchSession.matchedMoviesJSON,
  //             filmJSON,
  //           ],
  //         },
  //       };
  //     });
  //   })
  // );
}
