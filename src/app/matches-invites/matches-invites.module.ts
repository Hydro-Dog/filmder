import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { MatchesInvitesRoutingModule } from './matches-invites-routing.module';
import { MatchesInvitesComponent } from './matches-invites.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatchesInvitesRoutingModule,
    SharedModule,
  ],
  declarations: [MatchesInvitesComponent],
})
export class MatchesInvitesModule {}
