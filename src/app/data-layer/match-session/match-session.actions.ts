import { createAction, props } from '@datorama/akita-ng-effects';
import {
  MatchSession,
  MatchSessionChangesEvents,
  MatchSessionCO,
} from './match-session.models';

export const createMatchSession = createAction(
  '[Match Session] Create',
  props<{ matchSession: MatchSessionCO }>()
);

export const createMatchSessionSuccess = createAction(
  '[Match Session] Create Success',
  props<{
    matchSession: MatchSession;
  }>()
);

export const createMatchSessionError = createAction(
  '[Match Session] Create Error',
  props<{
    error: any;
  }>()
);

export const deleteMatchSession = createAction(
  '[Match Session] Delete',
  props<{ id: string }>()
);

export const deleteMatchSessionSuccess = createAction(
  '[Match Session] Delete Success',
  props<{
    id: string;
  }>()
);

export const deleteMatchSessionError = createAction(
  '[Match Session] Delete Error',
  props<{
    error: any;
  }>()
);

export const updateMatchSession = createAction(
  '[Match Session] Update',
  props<{ matchSession: MatchSession }>()
);

export const updateMatchSessionSuccess = createAction(
  '[Match Session] Update Success',
  props<{
    matchSession: MatchSession;
  }>()
);

export const updateMatchSessionError = createAction(
  '[Match Session] Update Error',
  props<{
    error: any;
  }>()
);

export const getCurrentMatchSession = createAction(
  '[Match Session] Get Current Match Session',
  props<{ matchSessionId: string }>()
);

export const getCurrentMatchSessionSuccess = createAction(
  '[Match Session] Get Current Match Session Success',
  props<{
    currentMatchSession: MatchSession;
  }>()
);

export const getCurrentMatchSessionError = createAction(
  '[Match Session] Get Current Match Session Error',
  props<{
    error: any;
  }>()
);

export const getMatchSessionsByUserId = createAction(
  '[Match Session] Get By User Id',
  props<{ userId: number }>()
);

export const getMatchSessionsByUserIdSuccess = createAction(
  '[Match Session] Get By User Id Success',
  props<{
    matchSessions: MatchSession[];
  }>()
);

export const getMatchSessionsByUserIdError = createAction(
  '[Match Session] Get By User Id Error',
  props<{
    error: any;
  }>()
);

export const searchMatchSessionsInvitedSuccess = createAction(
  '[Match Session] Search Invited Success',
  props<{
    matchSessions: MatchSession[];
  }>()
);

export const socketGetMatchSessionSuccess = createAction(
  '[Match Session] Socket Get Match Session Success',
  props<{
    matchSession: MatchSession;
    event: MatchSessionChangesEvents;
  }>()
);

// export const searchMatchSessionsInvitedError = createAction(
//   '[Match Session] Search Invited Error',
//   props<{
//     error: any;
//   }>()
// );
