import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, from, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  StorageService,
} from '../services/storage.service';
import { AuthService } from './state/auth.service';
import { Router } from '@angular/router';
import { ApiError } from '../shared/models/api-error';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  request: HttpRequest<any>;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.error.message === 'Refresh expired') {
          this.storageService.setValue({ key: ACCESS_TOKEN_KEY, value: null });
          this.storageService.setValue({ key: REFRESH_TOKEN_KEY, value: null });
          this.router.navigate(['/auth']);
        }
        if (error.status === 401) {
          this.request = request;
          console.log('ERROR CATCHED: ', request);
          return combineLatest([
            from(this.storageService.getValue(ACCESS_TOKEN_KEY)),
            from(this.storageService.getValue(REFRESH_TOKEN_KEY)),
          ]).pipe(
            switchMap(([accessToken, refreshToken]) => {
              return this.authService.refresh(
                refreshToken,
                getAuthHeaders(accessToken)
              );
            }),
            switchMap((user) => {
              this.storageService.setValue({
                key: ACCESS_TOKEN_KEY,
                value: user.accessToken,
              });
              console.log('comed back user: ', user);
              return next.handle(
                this.request.clone({
                  setHeaders: { Authorization: `Bearer ${user.accessToken}` },
                })
              );
            })
          );
        }

        return throwError(error);
      })
    );
  }
}

function getAuthHeaders(accessToken: string) {
  return new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
  });
}
