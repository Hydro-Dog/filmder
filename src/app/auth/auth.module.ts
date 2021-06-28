import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [IonicModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
