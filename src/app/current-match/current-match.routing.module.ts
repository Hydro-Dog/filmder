import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentMatchComponent } from './current-match.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentMatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentMatchRoutingModule {}
