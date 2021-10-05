import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesInvitesModule } from '../matches-invites/matches-invites.module';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'invites',
    loadChildren: () =>
      import('../matches-invites/matches-invites.module').then(
        (m) => m.MatchesInvitesModule
      ),
  },
  {
    path: 'pending',
    loadChildren: () =>
      import('../matches-pending/matches-pending.module').then(
        (m) => m.MatchesPendingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
