import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('../registration/registration.module').then(
            (m) => m.RegistrationModule
          ),
      },
    ],
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
