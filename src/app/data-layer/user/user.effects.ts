import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserMatchSessions,
  getCurrentUserMatchSessionsSuccess,
  resetCurrentUser,
  // setCurrentMatchSessionSuccess,
  updateCurrentUser,
  updateCurrentUserSuccess,
} from './user.actions';
import { UserService } from './user.service';
import { UserStore } from './user.store';

@Injectable()
export class UserEffects {
  type: ActionType;
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userStore: UserStore
  ) {}

  getCurrentUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCurrentUser),
        switchMap(() => {
          this.userStore.update((state) => ({
            ...state,
            currentUserLoading: true,
          }));
          return this.userService
            .getCurrentUser()
            .pipe(map((user) => getCurrentUserSuccess({ user })));
        })
      ),
    { dispatch: true }
  );

  @Effect()
  getCurrentUserSuccess$ = this.actions$.pipe(
    ofType(getCurrentUserSuccess),
    tap(({ user }) => {
      return this.userStore.update((state) => ({
        ...state,
        currentUserLoading: false,
        currentUser: user,
      }));
    })
  );

  // @Effect()
  // getUserSuccess$ = this.actions$.pipe(
  //   ofType(getUserSuccess),
  //   tap(({ user }) => {
  //     return this.userStore.update((state) => ({
  //       ...state,
  //       userLoading: false,
  //       user,
  //     }));
  //   })
  // );

  updateCurrentUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCurrentUser),
        switchMap(({ user }) => {
          this.userStore.update((state) => ({
            ...state,
            userLoading: true,
          }));
          return this.userService
            .updateCurrentUser(user)
            .pipe(map((user) => updateCurrentUserSuccess({ user })));
        })
      ),
    { dispatch: true }
  );

  @Effect()
  updateCurrentUserSuccess$ = this.actions$.pipe(
    ofType(updateCurrentUserSuccess),
    tap(({ user }) => {
      return this.userStore.update((state) => ({
        ...state,
        currentUserLoading: false,
        currentUser: user,
      }));
    })
  );

  getCurrentUserMatchSessions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCurrentUserMatchSessions),
        switchMap(() => {
          this.userStore.update((state) => ({
            ...state,
            currentUserMatchSessionsLoading: true,
          }));
          return this.userService
            .getCurrentUserMatchSessions()
            .pipe(
              map((currentUserMatches) =>
                getCurrentUserMatchSessionsSuccess({ currentUserMatches })
              )
            );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  getCurrentUserMatchSessionsSuccess$ = this.actions$.pipe(
    ofType(getCurrentUserMatchSessionsSuccess),
    tap(({ currentUserMatches }) => {
      return this.userStore.update((state) => ({
        ...state,
        currentUserMatchSessionsLoading: true,
        currentUserMatches,
      }));
    })
  );

  // @Effect()
  // setCurrentMatchSessionSuccess$ = this.actions$.pipe(
  //   ofType(setCurrentMatchSessionSuccess),
  //   tap(({ id }) => {
  //     return this.userStore.update((state) => ({
  //       ...state,
  //       currentUserLoading: false,
  //       currentUser: { ...state.currentUser, currentMatchSession: id },
  //     }));
  //   }),
  //   switchMap(() => of(true))
  // );

  @Effect()
  resetUser$ = this.actions$.pipe(
    ofType(resetCurrentUser),
    tap(() => {
      return this.userStore.update((state) => {
        return {
          ...state,
          currentUser: null,
        };
      });
    })
  );
}
