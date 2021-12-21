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
  shareReplay,
  first,
  filter,
} from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';
import { UserFacade } from '../data-layer/user/user.facade';
import { UserQuery } from '../data-layer/user/user.query';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
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
    username: new FormControl('', {
      validators: Validators.required,
      updateOn: 'blur',
    }),
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  readonly usernameControl = this.profileSettingsForm.get('username');
  readonly firstNameControl = this.profileSettingsForm.get('firstName');
  readonly lastNameControl = this.profileSettingsForm.get('lastName');

  readonly viewModes = ViewMode;

  readonly currentUser$ = this.userFacade.selectCurrentUser$.pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  readonly saveChanges$ = new Subject();
  readonly destroy$ = new Subject();
  initialFormValues: {
    username: string;
    firstName: string;
    lastName: string;
  };

  readonly checkUsernameExists$ = this.userFacade
    .getUser({ username: this.usernameControl.value })
    .pipe(catchError((e) => of(false)));

  constructor(
    private userFacade: UserFacade,
    private authFacade: AuthFacade,
    private router: Router,
    private storageService: StorageFacade,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser$
      .pipe(
        filter((x) => !!x),
        first()
      )
      .subscribe((user) => {
        if (user) {
          const { username, firstName, lastName } = user;
          this.initialFormValues = { username, firstName, lastName };

          this.profileSettingsForm.patchValue(
            {
              username,
              firstName,
              lastName,
            },
            { emitEvent: false, onlySelf: true }
          );
          this.cd.detectChanges();
        }
      });

    this.saveChanges$
      .pipe(
        switchMap(() => this.checkUsernameExistence()),
        withLatestFrom(this.userFacade.selectCurrentUser$),
        takeUntil(this.destroy$)
      )
      .subscribe(([err, currentUser]) => {
        if (err && this.usernameControl.value !== currentUser.username) {
          this.toastComponentShared.displayToast('Username already exists');
        } else {
          const updatedUser = this.profileSettingsForm.value;
          this.initialFormValues = {
            ...this.profileSettingsForm.value,
          };
          this.userFacade.updateCurrentUser({
            ...currentUser,
            ...updatedUser,
          });
          this.setViewMode(this.viewModes.View);
        }
      });
  }

  checkUsernameExistence() {
    return this.userFacade
      .getUser({ username: this.usernameControl.value })
      .pipe(catchError((e) => of(false)));
  }

  logOut() {
    this.authFacade.logout();
    this.userFacade.resetCurrentUser();
    this.storageService.clearStorage();
    this.router.navigate(['/start-screen']);
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

  cancelClicked() {
    this.setViewMode(ViewMode.View);
    this.profileSettingsForm.patchValue(this.initialFormValues);
  }

  doRefresh($event) {
    this.userFacade.getCurrentUser().subscribe(() => {
      $event.target.complete();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
