import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesCompletedComponent } from './matches-completed.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesCompletedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesCompletedRoutingModule {}
