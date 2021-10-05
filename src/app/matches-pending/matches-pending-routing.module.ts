import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesPendingComponent } from './matches-pending.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesPendingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesPendingRoutingModule {}
