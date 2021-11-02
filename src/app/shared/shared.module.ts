import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatchesListComponentShared } from './components/matches-list/matches-list.component';
import { AlertComponentShared } from './components/alert/alert.component';
import { PickerComponentShared } from './components/picker/picker.component';
import { ToastComponentShared } from './components/toast/toast.component';
import { StarCasePipe } from './pipes/start-case.pipe';
import { MatchDetailsModal } from './components/match-details-modal/match-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

const components = [
  ToastComponentShared,
  AlertComponentShared,
  PickerComponentShared,
  MatchesListComponentShared,
  MatchDetailsModal,
  StarCasePipe,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, IonicModule, MatDialogModule],
  exports: components,
})
export class SharedModule {}
