import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthFacade } from '../auth/state/auth.facade';

enum ViewMode {
  View,
  Edit,
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  viewMode = ViewMode.View;
  viewModes = ViewMode;

  profileSettingsForm = new FormGroup({
    userName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [this.checkUserNameIsTakenValidator.bind(this)],
      updateOn: 'blur',
    }),

    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setViewMode(mode: ViewMode) {
    this.viewMode = mode;
  }

  checkUserNameIsTakenValidator(control: AbstractControl) {
    return this.authFacade.checkUserNameIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }

  checkEmailIsTakenValidator(control: AbstractControl) {
    return this.authFacade.checkEmailIsTaken(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError(() => of({ isTaken: true }))
    );
  }

  checkPhoneIsTakenValidator(control: AbstractControl) {}
}
