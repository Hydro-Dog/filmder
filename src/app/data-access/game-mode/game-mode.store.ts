import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { GameModes } from './game-mode.models';

export interface GameModesState {
  gameModes: GameModes[];
  gameModesLoading: boolean;
  error: any;
}

export function createInitialState(): GameModesState {
  return {
    gameModes: [],
    gameModesLoading: false,
    error: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'gameMode' })
export class GameModesStore extends Store<GameModesState> {
  constructor() {
    super(createInitialState());
  }
}
