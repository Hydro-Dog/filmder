import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { CurrentMatchModule } from '../current-match/current-match.module';
import { CreateMatchModule } from '../create-match/create-match.module';
import { FastMatchComponent } from '../fast-match/fast-match.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab2PageRoutingModule,
    CurrentMatchModule,
    CreateMatchModule,
    SharedModule,
  ],
  declarations: [Tab2Page, FastMatchComponent],
})
export class Tab2PageModule {}
