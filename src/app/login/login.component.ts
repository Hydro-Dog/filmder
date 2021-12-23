import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';
import { AuthQuery } from '../auth/state/auth.query';
import { UserQuery } from '../data-layer/user/user.query';
import {
  ToastComponentShared,
  ToastPosition,
} from '@shared/components/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly toastPosition = ToastPosition;
  @ViewChild(ToastComponentShared)
  readonly toastComponentShared: ToastComponentShared;
  readonly invalidCredentialsErrorMessage = 'Invalid email or password.';
  readonly serverErrorMessage = 'Sorry, server error. Please, try again.';
  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      validators: Validators.required,
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });
  readonly emailControl = this.loginForm.get('email');
  readonly passwordControl = this.loginForm.get('password');
  readonly user$ = this.userQuery.selectCurrentUser$;
  readonly selectLoginError$ = this.authQuery.selectLoginError$;
  readonly showError$ = new BehaviorSubject(false);
  readonly destroy$ = new Subject();

  shopPassword = false;
  passwordsMissMatch: boolean;

  constructor(
    private navController: NavController,
    private authFacade: AuthFacade,
    private authQuery: AuthQuery,
    private userQuery: UserQuery,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.router.navigate(['/tabs/tab2']);
      }
    });

    this.selectLoginError$
      .pipe(
        filter((x) => !!x),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ({ error }) => {
          const errorMessage =
            error.status === 400
              ? this.invalidCredentialsErrorMessage
              : this.serverErrorMessage;

          this.toastComponentShared.displayToast(errorMessage);
        },
        () => {
          this.toastComponentShared.displayToast(this.serverErrorMessage);
        }
      );
  }

  loginClicked() {
    this.authFacade.login(this.emailControl.value, this.passwordControl.value);
    this.loginForm.reset();
  }

  navigateBack() {
    this.navController.navigateBack('/start-screen');
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];

    const result = control.dirty && control.invalid;

    return Boolean(result);
  }

  getErrorMessage(controlName: string): string {
    if (this.loginForm.controls[controlName].hasError('required')) {
      return '(Field required)';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
