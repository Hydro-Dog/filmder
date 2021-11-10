import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of, Subject } from 'rxjs';
import {
  takeUntil,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';
import { UserFacade } from '../data-layer/user/user.facade';
import { UserQuery } from '../data-layer/user/user.query';
import { ToastComponentShared } from '../shared/components/toast/toast.component';
import { ApiError } from '../shared/models/api-error';

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
  @ViewChild(ToastComponentShared) toastComponentShared: ToastComponentShared;
  viewMode = ViewMode.View;
  toastErrorMessage: string;

  readonly profileSettingsForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      updateOn: 'blur',
    }),
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      updateOn: 'blur',
    }),
  });

  readonly userNameControl = this.profileSettingsForm.get('userName');
  readonly firstNameControl = this.profileSettingsForm.get('firstName');
  readonly lastNameControl = this.profileSettingsForm.get('lastName');
  readonly phoneNumberControl = this.profileSettingsForm.get('phoneNumber');
  readonly viewModes = ViewMode;

  readonly user$ = this.userQuery.selectUser$;
  readonly saveChanges$ = new Subject();
  readonly destroy$ = new Subject();

  constructor(
    private userQuery: UserQuery,
    private userFacade: UserFacade,
    private authFacade: AuthFacade,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        const { userName, firstName, lastName, phoneNumber } = user;

        this.profileSettingsForm.patchValue(
          {
            userName,
            firstName,
            lastName,
            phoneNumber,
          },
          { emitEvent: false, onlySelf: true }
        );
        this.cd.detectChanges();
      } else {
        console.warn('user is null');
      }
    });

    this.saveChanges$
      .pipe(
        switchMap(() => {
          return forkJoin([
            this.userFacade
              .checkUserNameIsTaken(this.userNameControl.value)
              .pipe(catchError((e) => of(e))),
            this.userFacade
              .checkPhoneNumberIsTaken(this.phoneNumberControl.value)
              .pipe(catchError((e) => of(e))),
          ]).pipe(
            withLatestFrom(this.userFacade.selectUser$),
            tap(([err, currentUser]) => {
              const errorMessages = (err as ApiError[])
                .filter((x) => x.error)
                .map((x) => x.error.message);
              if (errorMessages.length) {
                this.toastComponentShared.displayToast(errorMessages[0]);
              } else {
                const updatedUser = this.profileSettingsForm.value;
                this.userFacade.updateUser({ ...currentUser, ...updatedUser });
                this.setViewMode(this.viewModes.View);
              }
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  logOut() {
    this.authFacade.logout();
    this.userFacade.resetStore();
    this.router.navigate(['/auth']);
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
  }

  saveChanges() {
    this.saveChanges$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
