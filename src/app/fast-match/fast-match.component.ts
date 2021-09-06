import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { PickerComponentShared } from '../shared/components/picker/picker.component';
import { MatchModes } from '../shared/models/match-modes';

@Component({
  templateUrl: 'fast-match.component.html',
  styleUrls: ['fast-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastMatchComponent implements OnInit {
  @ViewChild(PickerComponentShared, { static: true })
  pickerComponent: PickerComponentShared;
  matchModes = MatchModes;
  fastMatchForm = this.fb.group({
    mode: [MatchModes.Popular, Validators.required],
    region: ['', Validators.required],
    matchLimit: ['', Validators.required],
    partnerUsername: ['', Validators.required],
  });

  constructor(private navController: NavController, private fb: FormBuilder) {}

  ngOnInit(): void {}

  navigateBack() {
    this.navController.navigateBack('/tabs/tab2/create');
  }

  click() {
    this.pickerComponent.showPicker();
  }
}
