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
  getUser,
  getUserSuccess,
  resetStore,
  setCurrentMatchSessionSuccess,
  updateUser,
  updateUserSuccess,
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
            .pipe(map((user) => getUserSuccess({ user })));
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

  // updateUser$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(updateUser),
  //       switchMap(({ user }) => {
  //         this.userStore.update((state) => ({
  //           ...state,
  //           userLoading: true,
  //         }));
  //         return this.userService
  //           .updateUser(user)
  //           .pipe(map((user) => updateUserSuccess({ user })));
  //       })
  //     ),
  //   { dispatch: true }
  // );

  @Effect()
  updateUserSuccess$ = this.actions$.pipe(
    ofType(updateUserSuccess),
    tap(({ user }) => {
      return this.userStore.update((state) => ({
        ...state,
        currentUserLoading: false,
        currentUser: user,
      }));
    })
  );

  @Effect()
  setCurrentMatchSessionSuccess$ = this.actions$.pipe(
    ofType(setCurrentMatchSessionSuccess),
    tap(({ id }) => {
      return this.userStore.update((state) => ({
        ...state,
        currentUserLoading: false,
        currentUser: { ...state.currentUser, currentMatchSession: id },
      }));
    }),
    switchMap(() => of(true))
  );

  @Effect()
  resetStore$ = this.actions$.pipe(
    ofType(resetStore),
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
