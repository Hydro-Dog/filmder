import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable } from 'rxjs';
import { getGameModes } from './game-mode.actions';
import { GameModes } from './game-mode.models';
import { GameModesQuery } from './game-mode.query';

@Injectable({ providedIn: 'root' })
export class GameModesFacade {
  selectGameModes$ = this.gameModesQuery.selectGameModes$;
  selectError$ = this.gameModesQuery.selectError$;
  selectGameModesLoading$ = this.gameModesQuery.selectGameModesLoading$;

  constructor(
    private gameModesQuery: GameModesQuery,
    private actions: Actions
  ) {}

  getGameModes() {
    this.actions.dispatch(getGameModes());
  }
}
