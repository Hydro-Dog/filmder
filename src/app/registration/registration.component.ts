import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegistrationComponent implements DoCheck {
  passwordsMissMatch: boolean;

  registrationForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [this.checkUserNameIsTaken.bind(this)],
      updateOn: 'change',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailIsTaken.bind(this)],
      updateOn: 'change',
    }),
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
    passwordConfirm: new FormControl('', {
      validators: Validators.required,
    }),
  });

  userNameControl = this.registrationForm.get('userName');
  emailControl = this.registrationForm.get('email');
  firstNameControl = this.registrationForm.get('firstName');
  lastNameControl = this.registrationForm.get('lastName');
  passwordControl = this.registrationForm.get('password');
  passwordConfirmControl = this.registrationForm.get('passwordConfirm');

  constructor(
    private navController: NavController,
    private authService: AuthService
  ) {}
  ngDoCheck(): void {
    console.log('email: ', this.emailControl);
  }

  checkUserNameIsTaken(control: AbstractControl) {
    return this.authService.checkUserNameIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }

  checkEmailIsTaken(control: AbstractControl) {
    return this.authService.checkEmailIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }

  checkConfirmPassword(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordConfirm = group.controls.passwordConfirm.value;

    return password === passwordConfirm ? null : { notSame: true };
  }

  navigateBack() {
    this.navController.navigateBack('/auth');
  }

  onPasswordInput({ value }): void {
    this.passwordsMissMatch = this.passwordControl.value !== value;
    if (this.passwordControl.value !== value) {
      console.log(1000);
      this.passwordsMissMatch = true;
      this.passwordConfirmControl.setErrors({
        passwordMismatch: true,
      });
    } else {
      console.log(2000);
      this.registrationForm.controls.passwordConfirm.setErrors(null);
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registrationForm.controls[controlName];

    const result = control.dirty && control.invalid;

    return Boolean(result);
  }

  getPasswordConfirmErrorMessage() {
    if (
      this.registrationForm.controls['passwordConfirm'].hasError(
        'passwordMismatch'
      )
    ) {
      return '(Passwords does not match)';
    } else {
      return '(no err)';
    }
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
      return '(Password is too short or easy)';
    }

    if (
      controlName === 'passwordConfirm' &&
      this.registrationForm.controls[controlName].hasError('passwordMismatch')
    ) {
      return '(Passwords does not match)';
    }
  }
}
