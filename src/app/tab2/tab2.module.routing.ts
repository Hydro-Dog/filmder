import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('../create-match/create-match.module').then(
        (m) => m.CreateMatchModule
      ),
  },
  {
    path: 'current-match',
    loadChildren: () =>
      import('../pick-film/pick-film.module').then((m) => m.PickFilmModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
