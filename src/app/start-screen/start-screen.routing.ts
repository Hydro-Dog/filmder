import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartScreenComponent } from './start-screen.component';

const routes = [
  {
    path: '',
    component: StartScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StartScreenRoutingModule {}
