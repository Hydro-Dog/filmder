import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab3Page implements OnInit, OnDestroy {
  viewMode = ViewMode.View;
  viewModes = ViewMode;

  profileSettingsForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [
        this.asyncValidatorsService.checkUserNameIsTakenValidator.bind(
          this.asyncValidatorsService
        ),
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
        this.asyncValidatorsService.checkPhoneNumberIsTakenValidator.bind(
          this.asyncValidatorsService
        ),
      ],
      updateOn: 'blur',
    }),
  });

  userNameControl = this.profileSettingsForm.get('userName');
  firstNameControl = this.profileSettingsForm.get('firstName');
  lastNameControl = this.profileSettingsForm.get('lastName');
  phoneNumberControl = this.profileSettingsForm.get('phoneNumber');

  user$ = this.uerQuery.selectUser$;
  destroy$ = new Subject();

  constructor(
    private uerQuery: UserQuery,
    private asyncValidatorsService: AsyncValidatorsService
  ) {}

  ngOnInit(): void {
    this.userNameControl.valueChanges.subscribe((x) =>
      console.log('userNameControl: ', x)
    );
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        console.log(
          'this.asyncValidatorsService: ',
          this.asyncValidatorsService
        );
        const { userName, firstName, lastName, phoneNumber } = user;

        this.profileSettingsForm.disable();
        this.profileSettingsForm.patchValue(
          {
            userName,
            firstName,
            lastName,
            phoneNumber,
          },
          { emitEvent: false, onlySelf: true }
        );
        this.profileSettingsForm.enable();
      } else {
        console.warn('user is null');
      }
    });
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

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
