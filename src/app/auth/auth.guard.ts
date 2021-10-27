import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { nextTick } from 'process';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { STORAGE_ITEMS, StorageFacade } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageFacade) {}
  canActivate(): Observable<boolean> {
    return from(
      this.storageService.getItem(STORAGE_ITEMS.ACCESS_TOKEN_KEY)
    ).pipe(
      map((token) => {
        console.log('token: ', token);
        return !!token;
      }),
      tap((hasToken) => {
        console.log(
          'this.router.url: ',
          this.router.url,
          this.router.url.includes('auth')
        );
        // если нет токена и юзер пытается попасть на какую-то страницу
        // помимо login или registration то редиректить его обратно
        if (!hasToken) {
          if (
            this.router.url.includes('login') ||
            this.router.url.includes('registration')
          ) {
          } else {
            console.log('here');
            this.router.navigate(['/auth']);
          }
        }
      })
    );
  }
}
