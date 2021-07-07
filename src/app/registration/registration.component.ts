import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
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
export class RegistrationComponent {
  passwordsMissMatch: boolean;

  registrationForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [this.checkUserNameIsTakenValidator.bind(this)],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailIsTakenValidator.bind(this)],
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

  ngOnInit() {
    this.registrationForm.controls['passwordConfirm'].setValidators(
      this.matchPasswordsValidator.bind(this)
    );
  }

  checkUserNameIsTakenValidator(control: AbstractControl) {
    return this.authService.checkUserNameIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }

  checkEmailIsTakenValidator(control: AbstractControl) {
    return this.authService.checkEmailIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
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
