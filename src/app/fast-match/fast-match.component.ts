import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { FilmFacade } from '../data-layers/film/film.facade';
import { GameModesFacade } from '../data-layers/game-mode/game-mode.facade';
import { UserFacade } from '../data-layers/user/user.facade';
import { UserQuery } from '../data-layers/user/user.query';
import { PickerComponentShared } from '../shared/components/picker/picker.component';
import { ToastComponentShared } from '../shared/components/toast/toast.component';
import { MatchModes } from './match-modes.model';

@Component({
  templateUrl: 'fast-match.component.html',
  styleUrls: ['fast-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastMatchComponent implements OnInit, OnDestroy {
  @ViewChild(PickerComponentShared, { static: true })
  readonly pickerComponent: PickerComponentShared;
  @ViewChild(ToastComponentShared)
  readonly toastComponentShared: ToastComponentShared;

  readonly matchModes = MatchModes;
  readonly fastMatchForm = this.fb.group({
    gameMode: ['', Validators.required],
    matchLimit: [
      '',
      [Validators.required, Validators.min(1), Validators.max(25)],
    ],
    guestUsername: ['', Validators.required],
  });

  readonly regions$ = this.filmFacade.selectAvailableRegions$.pipe(
    map((x) =>
      x.map((item) => ({
        text: item.english_name,
        value: item.iso_3166_1,
      }))
    )
  );
  readonly gameModes$ = this.gameModesFacade.selectGameModes$;
  readonly regionClicked$ = new Subject();
  readonly pickedRegion$ = new BehaviorSubject({ text: '', value: '' });
  readonly selectedUser$ = this.userQuery.selectUser$;
  readonly destroy$ = new Subject();

  constructor(
    private navController: NavController,
    private fb: FormBuilder,
    private filmFacade: FilmFacade,
    private gameModesFacade: GameModesFacade,
    private userFacade: UserFacade,
    private userQuery: UserQuery
  ) {}

  ngOnInit(): void {
    this.filmFacade.getAvailableRegions();
    this.gameModesFacade.getGameModes();
    this.regionClicked$
      .pipe(withLatestFrom(this.regions$), takeUntil(this.destroy$))
      .subscribe(([_, regions]) => {
        //todo: why regions items have 'duration', 'transform' fields?
        this.pickerComponent.showPicker(regions).then(({ data }) => {
          this.pickedRegion$.next(data.Regions);
          console.log('picker: ', data.Regions);
        });
      });
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab2/create');
  }

  createGame() {
    this.userFacade
      .getByUsername(this.fastMatchForm.value.guestUsername)
      .pipe(withLatestFrom(this.selectedUser$), takeUntil(this.destroy$))
      .subscribe(([guestUser, selectedUser]) => {
        console.log('selectedUser: ', selectedUser);
        console.log('guestUser: ', guestUser);

        if (!guestUser) {
          this.toastComponentShared.displayToast(`Sorry, no such user`);
        } else if (guestUser.id === selectedUser.id) {
          this.toastComponentShared.displayToast(
            `Sorry, you can't invite yourself`
          );
        }
      });
    console.log(this.fastMatchForm.value);
    console.log(this.pickedRegion$.value);
    //check if guestName exists
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
