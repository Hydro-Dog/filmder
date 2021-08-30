import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatchInvitesComponent } from './match-invites.component';
import { InvitesRoutingModule } from './match-invites.routing.module';

@NgModule({
  declarations: [MatchInvitesComponent],
  imports: [CommonModule, IonicModule, InvitesRoutingModule],
  exports: [MatchInvitesComponent],
})
export class MatchInvitesModule {}
