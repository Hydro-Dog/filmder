import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { map, switchMap, tap } from 'rxjs/operators';
import { getUser, getUserSuccess } from './user.actions';
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
          console.log(1000);
          return this.userService
            .getUser(userId)
            .pipe(map((user) => getUserSuccess({ user })));
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

  // @Effect()
  // registerError$ = this.actions$.pipe(
  //   ofType(registerError),
  //   tap((error) => this.authStore.update((state) => ({ ...state, error })))
  // );

  // @Effect()
  // loginSuccess$ = this.actions$.pipe(
  //   ofType(loginSuccess),
  //   tap(({ user }) => {
  //     console.log('res user: ', user);
  //     this.storageService.setValue({ key: USER_ID, value: user.id });
  //     this.storageService.setValue({
  //       key: ACCESS_TOKEN_KEY,
  //       value: user.accessToken,
  //     });
  //     this.storageService.setValue({
  //       key: REFRESH_TOKEN_KEY,
  //       value: user.refreshToken,
  //     });
  //   }),
  //   map((x) => x.user),
  //   tap((user) =>
  //     this.authStore.update((state) => {
  //       return {
  //         ...state,
  //         user,
  //         userLoading: false,
  //       };
  //     })
  //   )
  // );
}
