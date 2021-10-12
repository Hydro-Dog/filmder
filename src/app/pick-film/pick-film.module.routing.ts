import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickFilmComponent } from './pick-film.component';

const routes: Routes = [
  {
    path: '',
    component: PickFilmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickFilmRoutingModule {}
