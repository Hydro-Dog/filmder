import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthEffects } from './state/auth.effects';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { UserEffects } from '../data-layers/user/user.effects';

@NgModule({
  declarations: [AuthComponent],
  imports: [IonicModule, RouterModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
