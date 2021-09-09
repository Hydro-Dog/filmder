import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { FilmFacade } from '../data-layers/film/film.facade';
import { GameModesFacade } from '../data-layers/game-mode/game-mode.facade';
import { PickerComponentShared } from '../shared/components/picker/picker.component';
import { MatchModes } from '../shared/models/match-modes';

@Component({
  templateUrl: 'fast-match.component.html',
  styleUrls: ['fast-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastMatchComponent implements OnInit, OnDestroy {
  @ViewChild(PickerComponentShared, { static: true })
  pickerComponent: PickerComponentShared;
  matchModes = MatchModes;
  fastMatchForm = this.fb.group({
    mode: [MatchModes.Popular, Validators.required],
    region: ['', Validators.required],
    matchLimit: ['', Validators.required],
    partnerUsername: ['', Validators.required],
  });

  regions$ = this.filmFacade.selectAvailableRegions$.pipe(
    map((x) => {
      console.log(
        'map: ',
        x.map((item) => ({ name: item.english_name, value: item.english_name }))
      );
      return x.map((item) => ({
        text: item.english_name,
        value: item.english_name,
      }));
    })
  );
  gameModes$ = this.gameModesFacade.selectGameModes$;
  regionClicked$ = new Subject();
  destroy$ = new Subject();

  constructor(
    private navController: NavController,
    private fb: FormBuilder,
    private filmFacade: FilmFacade,
    private gameModesFacade: GameModesFacade
  ) {}

  ngOnInit(): void {
    this.filmFacade.getAvailableRegions();
    this.gameModesFacade.getGameModes();
    this.regions$.subscribe((x) => console.log('regions: ', x));
    this.gameModes$.subscribe((x) => console.log('game modes: ', x));

    this.regionClicked$
      .pipe(withLatestFrom(this.regions$), takeUntil(this.destroy$))
      .subscribe(([_, regions]) => {
        //todo: why regions items have 'duration', 'transform' fields?
        this.pickerComponent.showPicker(regions);
      });
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab2/create');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
