import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserFacade } from '../data-layer/user/user.facade';

@Injectable({ providedIn: 'root' })
export class AsyncValidatorsService {
  constructor(private userFacade: UserFacade) {}

  checkEmailIsTakenValidator(control: AbstractControl) {
    return this.userFacade.checkEmailIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }

  checkUserNameIsTakenRegStep(control: AbstractControl) {
    return this.userFacade.getByUsername(control.value).pipe(
      switchMap(({ user }) => {
        if (user) {
          return of({ isTaken: true });
        }
        return of(null);
      })
    );
  }

  checkPhoneNumberIsTakenValidator(control: AbstractControl) {
    return this.userFacade.checkPhoneNumberIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }
}
