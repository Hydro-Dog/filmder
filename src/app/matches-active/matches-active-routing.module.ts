import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesActiveComponent } from './matches-active.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesActiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesActiveRoutingModule {}
