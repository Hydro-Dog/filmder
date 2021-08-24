import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserRO } from '@src/app/data-layers/user/user.models';

export interface AuthState {
  user: UserRO | null;
  token: string | null;
  id: number | null;
  loginError: any;
  idLoading: boolean;
  userLoading: boolean;
}

export function createInitialState(): AuthState {
  return {
    user: null,
    token: null,
    id: null,
    loginError: null,
    idLoading: false,
    userLoading: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
