import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomMatchComponent } from '../custom-match/custom-match.component';
import { FastMatchComponent } from '../fast-match/fast-match.component';
import { CreateMatchComponent } from './create-match.component';

const routes: Routes = [
  {
    path: '',
    component: CreateMatchComponent,
  },
  {
    path: 'fast',
    component: FastMatchComponent,
  },
  {
    path: 'custom',
    component: CustomMatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMatchRoutingModule {
  constructor() {}
}
