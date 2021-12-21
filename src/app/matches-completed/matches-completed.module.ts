import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { MatchesCompletedRoutingModule } from './matches-completed.module.routing';
import { MatchesCompletedComponent } from './matches-completed.component';
import { CompletedMatchesDetailsModal } from './completed-matches-details/completed-matches-details.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatchesCompletedRoutingModule,
    SharedModule,
  ],
  declarations: [MatchesCompletedComponent, CompletedMatchesDetailsModal],
})
export class MatchesCompletedModule {}
