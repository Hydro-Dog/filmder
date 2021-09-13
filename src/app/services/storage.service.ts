import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export const ACCESS_TOKEN_KEY = 'access-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';
export const USER_ID = 'user-id';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  createStorage() {
    this.storage.create();
  }

  async getValue(key: string) {
    return await this.storage.get(key);
  }

  async getStorage() {
    return await this.storage.keys();
  }

  clearStorage() {
    return this.storage.clear();
  }

  setValue({ key, value }) {
    this.storage.set(key, value);
  }
}
