import { ID } from '@datorama/akita';
import { createAction, props } from '@datorama/akita-ng-effects';
import { User, UserRO } from './user.models';

export const getUser = createAction('[User] Get User', props<{ userId: ID }>());

export const getUserSuccess = createAction(
  '[User] Get User Success',
  props<{
    user: UserRO;
  }>()
);

export const getUserError = createAction(
  '[User] Get User Error',
  props<{
    error: any;
  }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: Partial<User> }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{
    user: UserRO;
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
