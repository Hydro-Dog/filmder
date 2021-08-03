import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  checkUserNameIsTakenValidator(control: AbstractControl) {
    return this.authFacade.checkUserNameIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
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
