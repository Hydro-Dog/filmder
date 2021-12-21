import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { MatchesActiveRoutingModule } from './matches-active.module.routing';
import { MatchesActiveComponent } from './matches-active.component';
import { ActiveMatchDetailsModal } from './active-match-details/active-match-details.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatchesActiveRoutingModule,
    SharedModule,
  ],
  declarations: [MatchesActiveComponent, ActiveMatchDetailsModal],
})
export class MatchesActiveModule {}
