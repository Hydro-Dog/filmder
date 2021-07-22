import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { combineLatest, from, Observable } from 'rxjs';
import { ACCESS_TOKEN_KEY, StorageService } from '../services/storage.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ParamInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return combineLatest([
      from(this.storageService.getValue(ACCESS_TOKEN_KEY)),
      from(this.storageService.getValue('userId')),
    ]).pipe(
      map(([accessToken, userId]) => {
        if (accessToken && userId) {
          const headers = new HttpHeaders({
            Authorization: accessToken,
            Id: userId,
            'Content-Type': 'application/json',
          });

          return req.clone({ headers });
        }
        console.warn('no headers were set');
        return req;
      }),
      switchMap(() => next.handle(req))
    );
  }
}
