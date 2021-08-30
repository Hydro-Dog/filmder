import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchInvitesComponent } from '../match-invites/match-invites.component';

const routes: Routes = [
  {
    path: '',
    component: MatchInvitesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitesRoutingModule {}
