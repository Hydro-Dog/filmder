import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { environment } from '@src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseAnalyticsService {
  constructor() {
    //for web only
    this.initFirebase();
  }

  async initFirebase() {
    if ((await Device.getInfo()).platform === 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }

  setUser(userId: string) {
    FirebaseAnalytics.setUserId({ userId });
  }

  logEvent(name: string, params: any) {
    FirebaseAnalytics.logEvent({
      name,
      params,
    });
  }
}
