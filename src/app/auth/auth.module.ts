import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    AuthRoutingModule,
    // HttpClientModule,
  ],
})
export class AuthModule {}
