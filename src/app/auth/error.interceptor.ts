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
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { AuthService } from './state/auth.service';
import { Router } from '@angular/router';

const UNAUTHORIZED_STATUS_CODE = 401;
const REFRESH_EXPIRED_STATUS_MESSAGE = 'Refresh expired';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  request: HttpRequest<any>;

  constructor(
    private storageFacade: StorageFacade,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.error.message === REFRESH_EXPIRED_STATUS_MESSAGE) {
          this.storageFacade.removeItem(STORAGE_ITEMS.ACCESS_TOKEN_KEY);
          this.storageFacade.removeItem(STORAGE_ITEMS.REFRESH_TOKEN_KEY);
          this.storageFacade.removeItem(STORAGE_ITEMS.USER_ID);
          this.router.navigate(['/auth']);
        }
        if (error.status === UNAUTHORIZED_STATUS_CODE) {
          this.request = request;

          return combineLatest([
            from(this.storageFacade.getItem(STORAGE_ITEMS.ACCESS_TOKEN_KEY)),
            from(this.storageFacade.getItem(STORAGE_ITEMS.REFRESH_TOKEN_KEY)),
          ]).pipe(
            switchMap(([accessToken, refreshToken]) => {
              return this.authService.refresh(
                refreshToken,
                getAuthHeader(accessToken)
              );
            }),
            switchMap((user) => {
              this.storageFacade.setItem({
                key: STORAGE_ITEMS.ACCESS_TOKEN_KEY,
                value: user.accessToken,
              });

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

function getAuthHeader(accessToken: string) {
  return new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
  });
}
