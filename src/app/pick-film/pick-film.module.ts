import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PickFilmComponent } from './pick-film.component';
import { PickFilmRoutingModule } from './pick-film.module.routing';

@NgModule({
  declarations: [PickFilmComponent],
  imports: [CommonModule, IonicModule, PickFilmRoutingModule],
})
export class PickFilmModule {}
