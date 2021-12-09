import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartScreenRoutingModule } from './start-screen.routing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StartScreenComponent } from './start-screen.component';

@NgModule({
  declarations: [StartScreenComponent],
  imports: [IonicModule, RouterModule, CommonModule, StartScreenRoutingModule],
})
export class StartScreenModule {}
