import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { MatchesPendingRoutingModule } from './matches-pending.module.routing';
import { MatchesPendingComponent } from './matches-pending.component';
import { PendingMatchDetailsModal } from './pending-match-details/pending-match-details.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatchesPendingRoutingModule,
    SharedModule,
  ],
  declarations: [MatchesPendingComponent, PendingMatchDetailsModal],
})
export class MatchesPendingModule {}
