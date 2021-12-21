import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { MatchesInvitesRoutingModule } from './matches-invites.module.routing';
import { MatchesInvitesComponent } from './matches-invites.component';
import { InvitesMatchesDetailsModal } from './invites-to-matches-details/invites-to-matches-details.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatchesInvitesRoutingModule,
    SharedModule,
  ],
  declarations: [MatchesInvitesComponent, InvitesMatchesDetailsModal],
})
export class MatchesInvitesModule {}
