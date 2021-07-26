import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
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
import { AuthService } from '../state/auth.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  request: HttpRequest<any>;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.request = request;
          console.log('ERROR CATCHED: ', request);
          // return this.authService.refresh()
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

          // return getRefresh -> update locatStorage -> nex.handle(req.clone)
        }

        this.storageService.clearStorage();
        return throwError('aaa');
      })
    );
    // return next.handle(request).pipe(
    //   tap(
    //     (event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //         // do stuff with response if you want
    //       }
    //     },
    //     (err: any) => {
    //       if (err instanceof HttpErrorResponse) {
    //         if (err.status === 401) {
    //           // redirect to the login route
    //           // or show a modal
    //         }
    //       }
    //     }
    //   )
    // );
  }
}

function getAuthHeaders(accessToken: string) {
  return new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
  });
}
// catchError((error) => {
//     console.log('error: ', error);
//     if (error.status === 403) {
//     }
//   })
