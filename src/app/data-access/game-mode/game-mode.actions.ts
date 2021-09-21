import { createAction, props } from '@datorama/akita-ng-effects';
import { GameModes } from './game-mode.models';

export const getGameModes = createAction('[Game Modes] Get Game Modes');

export const getGameModesSuccess = createAction(
  '[Game Modes] Get Game Modes Success',
  props<{
    gameModes: GameModes[];
  }>()
);

export const getGameModesError = createAction(
  '[Game Modes] Get Game Modes Error',
  props<{
    error: any;
  }>()
);
