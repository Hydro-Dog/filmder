import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UserState {
  currentUser: any | null;
  error: any;
  currentUserLoading: boolean;
}

export function createInitialState(): UserState {
  return {
    currentUser: null,
    error: null,
    currentUserLoading: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
