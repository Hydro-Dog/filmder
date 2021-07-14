import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  userName: string | null;
  token: string | null;
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  error: any;
}

export function createInitialState(): AuthState {
  return {
    userName: null,
    token: null,
    id: null,
    firstName: null,
    lastName: null,
    error: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
