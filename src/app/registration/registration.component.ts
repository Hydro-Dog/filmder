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
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';
import { AuthQuery } from '../auth/state/auth.query';
import { UserFacade } from '../data-layer/user/user.facade';
import { CreateUserDTO, UserEntity } from '../data-layer/user/user.models';
import { AsyncValidatorsService } from '../services/async-validators.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegistrationComponent implements OnInit, OnDestroy {
  passwordsMissMatch: boolean;
  registerSentSuccessfully$ = new BehaviorSubject(false);

  registrationForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [this.findByUsername.bind(this)],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.findByEmail.bind(this)],
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
  shopPassword = false;
  shopPasswordConfirm = false;

  readonly registerClicked$ = new Subject();
  destroy$ = new Subject();
  showSpinner$ = new BehaviorSubject(false);

  constructor(
    private navController: NavController,
    private authFacade: AuthFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit() {
    this.registrationForm.controls['passwordConfirm'].setValidators(
      this.matchPasswordsValidator.bind(this)
    );

    this.registerClicked$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          this.showSpinner$.next(true);
          const user: CreateUserDTO = {
            username: this.userNameControl.value,
            email: this.emailControl.value,
            firstName: this.firstNameControl.value,
            lastName: this.lastNameControl.value,
            password: this.passwordControl.value,
          };
          return this.authFacade.register(user);
        })
      )
      .subscribe(
        () => {
          this.registerSentSuccessfully$.next(true);
          this.showSpinner$.next(false);
        },
        () => {
          this.showSpinner$.next(false);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  // registerClicked() {
  //   const user: CreateUserDTO = {
  //     username: this.userNameControl.value,
  //     email: this.emailControl.value,
  //     firstName: this.firstNameControl.value,
  //     lastName: this.lastNameControl.value,
  //     password: this.passwordControl.value,
  //   };
  //   this.authFacade.register(user);
  // }

  matchPasswordsValidator(control: AbstractControl): ValidationErrors {
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
      return '(Different Passwords)';
    }
  }

  findByUsername(formControl: FormControl) {
    const query = { username: formControl.value };
    return this.userFacade.getUser(query).pipe(
      switchMap(() => {
        return of({ isTaken: true });
      }),
      catchError(() => of())
    );
  }

  findByEmail(formControl: FormControl) {
    const query = { email: formControl.value };
    return this.userFacade.getUser(query).pipe(
      switchMap(() => {
        return of({ isTaken: true });
      }),
      catchError(() => of())
    );
  }

  // checkEmailIsTakenValidator(control: AbstractControl) {
  //   return this.userFacade.checkEmailIsTaken(control.value).pipe(
  //     map(() => {
  //       return null;
  //     }),
  //     catchError(() => of({ isTaken: true }))
  //   );
  // }

  // checkUserNameIsTakenRegStep(control: AbstractControl) {
  //   return this.userFacade.getByUsername(control.value).pipe(
  //     switchMap((user) => {
  //       if (user) {
  //         return of({ isTaken: true });
  //       }
  //       return of(null);
  //     })
  //   );
  // }
}
