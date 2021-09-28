import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { startCase } from 'lodash';
import { map, switchMap, tap } from 'rxjs/operators';
import { getGameModes, getGameModesSuccess } from './game-mode.actions';
import { GameModesService } from './game-mode.service';
import { GameModesStore } from './game-mode.store';

@Injectable()
export class GameModesEffects {
  type: ActionType;
  constructor(
    private actions$: Actions,
    private gameModesService: GameModesService,
    private gameModesStore: GameModesStore
  ) {
    console.log('GameModesEffects');
  }

  getGameModes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getGameModes),
        switchMap(() => {
          console.log('getGameModes 2');
          this.gameModesStore.update((state) => ({
            ...state,
            gameModesLoading: true,
          }));
          return this.gameModesService
            .getGameModes()
            .pipe(map((gameModes) => getGameModesSuccess({ gameModes })));
        })
      ),
    { dispatch: true }
  );

  @Effect()
  getGameModesSuccess$ = this.actions$.pipe(
    ofType(getGameModesSuccess),
    tap(({ gameModes }) => {
      console.log('gameModes: ', gameModes);
      return this.gameModesStore.update((state) => ({
        ...state,
        gameModesLoading: false,
        gameModes: gameModes.map((item) => ({
          ...item,
          name: startCase(item.value),
        })),
      }));
    })
  );
}
