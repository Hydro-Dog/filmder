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
  getUser,
  getUserSuccess,
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

  getUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUser),
        switchMap(({ userId }) => {
          this.userStore.update((state) => ({
            ...state,
            userLoading: true,
          }));
          return this.userService
            .getUser(userId)
            .pipe(map((user) => getUserSuccess({ user })));
        })
      ),
    { dispatch: true }
  );

  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUser),
        switchMap(({ user }) => {
          this.userStore.update((state) => ({
            ...state,
            userLoading: true,
          }));
          return this.userService
            .updateUser(user)
            .pipe(map((user) => updateUserSuccess({ user })));
        })
      ),
    { dispatch: true }
  );

  @Effect()
  getUserSuccess$ = this.actions$.pipe(
    ofType(getUserSuccess),
    tap(({ user }) => {
      return this.userStore.update((state) => ({
        ...state,
        userLoading: false,
        user,
      }));
    })
  );

  @Effect()
  updateUserSuccess$ = this.actions$.pipe(
    ofType(updateUserSuccess),
    tap(({ user }) => {
      return this.userStore.update((state) => ({
        ...state,
        userLoading: false,
        user,
      }));
    })
  );

  @Effect()
  setCurrentMatchSessionSuccess$ = this.actions$.pipe(
    ofType(setCurrentMatchSessionSuccess),
    tap(({ id }) => {
      return this.userStore.update((state) => ({
        ...state,
        userLoading: false,
        user: { ...state.user, currentMatchSession: id },
      }));
    })
  );
}
