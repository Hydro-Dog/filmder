import { ID } from '@datorama/akita';
import { createAction, props } from '@datorama/akita-ng-effects';
import { UserEntity } from './user.models';

export const getUser = createAction('[User] Get User');

export const getUserSuccess = createAction(
  '[User] Get User Success',
  props<{
    user: UserEntity;
  }>()
);

export const getUserError = createAction(
  '[User] Get User Error',
  props<{
    error: any;
  }>()
);

export const getCurrentUser = createAction('[User] Get Current User');

export const getCurrentUserSuccess = createAction(
  '[User] Get Current  User Success',
  props<{
    user: UserEntity;
  }>()
);

export const getCurrentUserError = createAction(
  '[User] Get Current User Error',
  props<{
    error: any;
  }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: Partial<UserEntity> }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{
    user: UserEntity;
  }>()
);

export const updateUserError = createAction(
  '[User] Update User Error',
  props<{
    error: any;
  }>()
);

export const setCurrentMatchSessionSuccess = createAction(
  '[User] Set Current Match Session Success',
  props<{
    id: string;
  }>()
);

export const setActiveMatchSession = createAction(
  '[User] Set Active MatchSession',
  props<{ matchSessionId: number }>()
);

export const setActiveMatchSessionSuccess = createAction(
  '[User] Set Active MatchSession Success',
  props<{
    user: UserEntity;
  }>()
);

export const setActiveMatchSessionError = createAction(
  '[User] Set Active MatchSession Error',
  props<{
    error: any;
  }>()
);

export const resetStore = createAction('[User] Reset Store');
