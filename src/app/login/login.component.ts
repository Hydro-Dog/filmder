import {
  ChangeDetectionStrategy,
  Component,
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
export class LoginComponent implements OnInit {
  ToastPosition = ToastPosition;
  @ViewChild(ToastComponentShared) toastComponentShared: ToastComponentShared;
  loginErrorMessage = 'Invalid username or password';
  passwordsMissMatch: boolean;
  user$ = this.userQuery.selectUser$;
  userLoading$ = this.authQuery.selectUserLoading$;
  selectLoginError$ = this.authQuery.selectLoginError$;

  loginForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });

  userNameControl = this.loginForm.get('userName');
  passwordControl = this.loginForm.get('password');

  showError$ = new BehaviorSubject(false);
  destroy$ = new Subject();

  constructor(
    private navController: NavController,
    private authFacade: AuthFacade,
    private authQuery: AuthQuery,
    private userQuery: UserQuery,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      console.log('user!!!', user);
      if (user) {
        this.router.navigate(['/tabs/tab2']);
      }
    });
    this.userLoading$.subscribe((userLoading) =>
      console.log('userLoading: ', userLoading)
    );

    this.selectLoginError$
      .pipe(
        filter((x) => !!x),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.toastComponentShared.displayToast(this.loginErrorMessage);
      });
  }

  loginClicked() {
    console.log('loginClicked:');
    this.authFacade.login(
      this.userNameControl.value,
      this.passwordControl.value
    );
  }

  navigateBack() {
    this.navController.navigateBack('/auth');
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
}
