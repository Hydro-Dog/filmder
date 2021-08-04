import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserRO } from './user.models';

export interface UserState {
  user: UserRO | null;
  error: any;
  userLoading: boolean;
}

export function createInitialState(): UserState {
  return {
    user: null,
    error: null,
    userLoading: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
