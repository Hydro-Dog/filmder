import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export enum STORAGE_ITEMS {
  ACCESS_TOKEN_KEY = 'access-token',
  REFRESH_TOKEN_KEY = 'refresh-token',
  USER_ID = 'user-id',
}

@Injectable({
  providedIn: 'root',
})
export class StorageFacade {
  constructor(private storage: Storage) {}

  createStorage() {
    return this.storage.create();
  }

  async getItem(key: string) {
    return await this.storage.get(key);
  }

  async getStorage() {
    return await this.storage.keys();
  }

  clearStorage() {
    return this.storage.clear();
  }

  setItem({ key, value }) {
    this.storage.set(key, value);
  }

  removeItem(key: string) {
    this.storage.remove(key);
  }
}
