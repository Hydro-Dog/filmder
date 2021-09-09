import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { combineLatest, from, Observable } from 'rxjs';
import {
  ACCESS_TOKEN_KEY,
  StorageService,
  USER_ID,
} from '../../services/storage.service';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return combineLatest([
      from(this.storageService.getValue(ACCESS_TOKEN_KEY)),
      from(this.storageService.getValue(USER_ID)),
    ]).pipe(
      map(([accessToken, userId]) => {
        if (accessToken && userId) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          });
          return req.url.includes('/api') ? req.clone({ headers }) : req;
        }
        console.warn('no headers were set');
        return req;
      }),
      switchMap((req) => next.handle(req))
    );
  }
}
