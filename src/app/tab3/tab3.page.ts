import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';
import { UserQuery } from '../data-layers/user/user.query';
import { AsyncValidatorsService } from '../helpers/async-validators.service';

enum ViewMode {
  View,
  Edit,
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  viewMode = ViewMode.View;
  viewModes = ViewMode;

  profileSettingsForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [
        this.asyncValidatorsService.checkUserNameIsTakenValidator.bind(this),
      ],
      updateOn: 'blur',
    }),

    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [
        this.asyncValidatorsService.checkPhoneNumberIsTakenValidator.bind(this),
      ],
      updateOn: 'blur',
    }),
  });

  userNameControl = this.profileSettingsForm.get('userName');
  firstNameControl = this.profileSettingsForm.get('firstName');
  lastNameControl = this.profileSettingsForm.get('lastName');
  phoneNumberControl = this.profileSettingsForm.get('phoneNumber');

  user$ = this.uerQuery.selectUser$;

  constructor(
    private uerQuery: UserQuery,
    private asyncValidatorsService: AsyncValidatorsService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setViewMode(mode: ViewMode) {
    this.viewMode = mode;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.profileSettingsForm.controls[controlName];
    const result = control.dirty && control.invalid;

    return Boolean(result);
  }

  getErrorMessage(controlName: string): string {
    if (this.profileSettingsForm.controls[controlName].hasError('required')) {
      return '(Field required)';
    }

    if (
      controlName === 'userName' &&
      this.profileSettingsForm.controls[controlName].hasError('isTaken')
    ) {
      return '(Username is taken)';
    }

    if (
      controlName === 'phoneNumber' &&
      this.profileSettingsForm.controls[controlName].hasError('isTaken')
    ) {
      return '(Phone number is taken)';
    }
  }

  // checkUserNameIsTakenValidator(control: AbstractControl) {
  //   return this.authFacade.checkUserNameIsTaken(control.value).pipe(
  //     map(() => {
  //       return null;
  //     }),
  //     catchError(() => of({ isTaken: true }))
  //   );
  // }

  // checkEmailIsTakenValidator(control: AbstractControl) {
  //   return this.authFacade.checkEmailIsTaken(control.value).pipe(
  //     map(() => {
  //       return null;
  //     }),
  //     catchError(() => of({ isTaken: true }))
  //   );
  // }

  // checkPhoneIsTakenValidator(control: AbstractControl) {}
}
