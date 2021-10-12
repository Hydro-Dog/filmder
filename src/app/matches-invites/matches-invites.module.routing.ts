import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesInvitesComponent } from './matches-invites.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesInvitesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesInvitesRoutingModule {}
