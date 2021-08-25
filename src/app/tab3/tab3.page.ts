import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin, of, Subject } from 'rxjs';
import { takeUntil, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';
import { UserFacade } from '../data-layers/user/user.facade';
import { UserQuery } from '../data-layers/user/user.query';
import { ToastComponentShared } from '../shared/components/toast-component/toast.component';
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
  viewModes = ViewMode;
  toastErrorMessage: string;

  profileSettingsForm = new FormGroup({
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

  userNameControl = this.profileSettingsForm.get('userName');
  firstNameControl = this.profileSettingsForm.get('firstName');
  lastNameControl = this.profileSettingsForm.get('lastName');
  phoneNumberControl = this.profileSettingsForm.get('phoneNumber');

  user$ = this.uerQuery.selectUser$;
  saveChanges$ = new Subject();
  destroy$ = new Subject();

  constructor(
    private uerQuery: UserQuery,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
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
            this.authFacade
              .checkUserNameIsTaken(this.userNameControl.value)
              .pipe(catchError((e) => of(e))),
            this.authFacade
              .checkPhoneNumberIsTaken(this.phoneNumberControl.value)
              .pipe(catchError((e) => of(e))),
          ]).pipe(
            tap((err) => {
              const errorMessages = (err as ApiError[])
                .filter((x) => x.error)
                .map((x) => x.error.message);
              if (errorMessages.length) {
                this.toastComponentShared.displayToast(errorMessages[0]);
              } else {
                this.userFacade.updateUser(this.profileSettingsForm.value);
                this.setViewMode(this.viewModes.View);
              }
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
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
