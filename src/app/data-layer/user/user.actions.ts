import { ID } from '@datorama/akita';
import { createAction, props } from '@datorama/akita-ng-effects';
import {
  GetMatchSessionDTO,
  MatchSessionEntity,
} from '../match-session/match-session.models';
import { UserEntity } from './user.models';

// export const getUser = createAction('[User] Get User');

// export const getUserSuccess = createAction(
//   '[User] Get User Success',
//   props<{
//     user: UserEntity;
//   }>()
// );

// export const getUserError = createAction(
//   '[User] Get User Error',
//   props<{
//     error: any;
//   }>()
// );

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

export const updateCurrentUser = createAction(
  '[User] Update Current User',
  props<{ user: Partial<UserEntity> }>()
);

export const updateCurrentUserSuccess = createAction(
  '[User] Update Current User Success',
  props<{
    user: UserEntity;
  }>()
);

export const updateCurrentUserError = createAction(
  '[User] Update Current User Error',
  props<{
    error: any;
  }>()
);

export const getCurrentUserMatchSessions = createAction(
  '[User] Get Current User Match Sessions'
);

export const getCurrentUserMatchSessionsSuccess = createAction(
  '[User] Get Current User Match Sessions Success',
  props<{
    currentUserMatches: MatchSessionEntity[];
  }>()
);

export const getCurrentUserMatchSessionsError = createAction(
  '[User] Get Current User Match Sessions Error',
  props<{
    error: any;
  }>()
);

// export const setCurrentMatchSessionSuccess = createAction(
//   '[User] Set Current Match Session Success',
//   props<{
//     id: string;
//   }>()
// );

// export const setActiveMatchSession = createAction(
//   '[User] Set Active MatchSession',
//   props<{ matchSessionId: number }>()
// );

// export const setActiveMatchSessionSuccess = createAction(
//   '[User] Set Active MatchSession Success',
//   props<{
//     user: UserEntity;
//   }>()
// );

// export const setActiveMatchSessionError = createAction(
//   '[User] Set Active MatchSession Error',
//   props<{
//     error: any;
//   }>()
// );

export const resetCurrentUser = createAction('[User] Reset Current User');
