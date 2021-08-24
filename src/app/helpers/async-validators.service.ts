import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';

@Injectable({ providedIn: 'root' })
export class AsyncValidatorsService {
  constructor(private authFacade: AuthFacade) {}

  checkEmailIsTakenValidator(control: AbstractControl) {
    return this.authFacade.checkEmailIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }

  checkUserNameIsTakenRegStep(control: AbstractControl) {
    return this.authFacade.getByUsername(control.value).pipe(
      switchMap(({ user }) => {
        if (user) {
          return of({ isTaken: true });
        }
        return of(null);
      })
    );
  }

  checkPhoneNumberIsTakenValidator(control: AbstractControl) {
    return this.authFacade.checkPhoneNumberIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }
}
