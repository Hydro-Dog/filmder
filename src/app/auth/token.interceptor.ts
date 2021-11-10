import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { STORAGE_ITEMS, StorageFacade } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageFacade) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(
      this.storageService.getItem(STORAGE_ITEMS.ACCESS_TOKEN_KEY)
    ).pipe(
      map((accessToken) => {
        if (accessToken) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          });

          return req.url.includes('/api') || req.url.includes('/logout')
            ? req.clone({ headers })
            : req;
        }

        return req;
      }),
      switchMap((req) => next.handle(req))
    );
  }
}
