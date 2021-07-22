import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AuthFacade } from '../auth/state/auth.facade';
import { AuthQuery } from '../auth/state/auth.query';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  passwordsMissMatch: boolean;
  user$ = this.authQuery.selectUser$;
  userLoading$ = this.authQuery.selectUserLoading$;

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

  destroy$ = new Subject();

  constructor(
    private navController: NavController,
    private authFacade: AuthFacade,
    private authQuery: AuthQuery
  ) {}

  ngOnInit() {
    this.user$.subscribe((user) => console.log('user: ', user));
    this.userLoading$.subscribe((userLoading) =>
      console.log('userLoading: ', userLoading)
    );
  }

  loginClicked() {
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
