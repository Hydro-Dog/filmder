import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { GameModesState, GameModesStore } from './game-mode.store';

@Injectable({ providedIn: 'root' })
export class GameModesQuery extends Query<GameModesState> {
  selectGameModes$ = this.select('gameModes');
  selectError$ = this.select('error');
  selectGameModesLoading$ = this.select('gameModesLoading');

  constructor(protected store: GameModesStore) {
    super(store);
  }
}
