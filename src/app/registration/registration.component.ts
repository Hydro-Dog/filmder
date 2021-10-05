import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { of, Subject } from 'rxjs';
import { AuthFacade } from '../auth/state/auth.facade';
import { AuthQuery } from '../auth/state/auth.query';
import { User } from '../data-layer/user/user.models';
import { AsyncValidatorsService } from '../services/async-validators.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegistrationComponent implements OnInit, OnDestroy {
  passwordsMissMatch: boolean;
  showConfirmationScreen: boolean;

  registrationForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [
        this.asyncValidatorsService.checkUserNameIsTakenRegStep.bind(this),
      ],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [
        this.asyncValidatorsService.checkEmailIsTakenValidator.bind(this),
      ],
      updateOn: 'blur',
    }),
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
        ),
      ],
    }),
    passwordConfirm: new FormControl('', {
      validators: Validators.required,
    }),
  });

  userNameControl = this.registrationForm.controls.userName;
  emailControl = this.registrationForm.controls.email;
  firstNameControl = this.registrationForm.controls.firstName;
  lastNameControl = this.registrationForm.controls.lastName;
  passwordControl = this.registrationForm.controls.password;
  passwordConfirmControl = this.registrationForm.controls.passwordConfirm;

  selectIdLoading$ = this.authQuery.selectIdLoading$;
  selectIsLogin$ = this.authQuery.selectIsLogin$;
  destroy$ = new Subject();

  constructor(
    private navController: NavController,
    private authFacade: AuthFacade,
    private authQuery: AuthQuery,
    private asyncValidatorsService: AsyncValidatorsService
  ) {}

  ngOnInit() {
    this.registrationForm.controls['passwordConfirm'].setValidators(
      this.matchPasswordsValidator.bind(this)
    );

    this.selectIdLoading$.subscribe((x) =>
      console.log('selectIdLoading$: ', x)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  registerClicked() {
    const user: User = {
      userName: this.userNameControl.value,
      email: this.emailControl.value,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      password: this.passwordControl.value,
    };
    this.authFacade.register(user);
  }

  matchPasswordsValidator(control: AbstractControl): ValidationErrors {
    console.log('this.passwordControl: ', this.passwordControl.dirty);
    return control.value !== this.passwordControl.value
      ? {
          passwordMismatch: true,
        }
      : null;
  }

  navigateBack() {
    this.navController.navigateBack('/auth');
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registrationForm.controls[controlName];
    console.log(this.registrationForm.controls['userName']);

    const result = control.dirty && control.invalid;

    return Boolean(result);
  }

  getErrorMessage(controlName: string): string {
    if (this.registrationForm.controls[controlName].hasError('required')) {
      return '(Field required)';
    }

    if (
      controlName === 'email' &&
      this.registrationForm.controls[controlName].hasError('email')
    ) {
      return '(Invalid Email)';
    }

    if (
      controlName === 'email' &&
      this.registrationForm.controls[controlName].hasError('isTaken')
    ) {
      return '(Email is taken)';
    }

    if (
      controlName === 'userName' &&
      this.registrationForm.controls[controlName].hasError('isTaken')
    ) {
      return '(Username is taken)';
    }

    if (
      controlName === 'password' &&
      this.registrationForm.controls[controlName].hasError('pattern')
    ) {
      return '(Password is too easy or invalid)';
    }

    if (controlName === 'passwordConfirm') {
      console.log(
        'controlName: ',
        controlName,
        this.registrationForm.controls[controlName]
      );

      return '(Different Passwords)';
    }
  }
}
