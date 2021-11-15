import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FilmCardShared } from '../shared/components/film-card/film-card.component';
import { SharedModule } from '../shared/shared.module';
import { PickFilmComponent } from './pick-film.component';
import { PickFilmRoutingModule } from './pick-film.module.routing';

@NgModule({
  declarations: [PickFilmComponent, FilmCardShared],
  imports: [CommonModule, IonicModule, SharedModule, PickFilmRoutingModule],
})
export class PickFilmModule {}
