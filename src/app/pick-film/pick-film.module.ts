import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FilmCardShared } from '../shared/components/film-card/film-card.component';
import { ListOfMatchedFilmsModalComponent } from '../shared/components/list-of-matched-films-modal/list-of-matched-films-modal.component';
import { SharedModule } from '../shared/shared.module';
import { PickFilmComponent } from './pick-film.component';
import { PickFilmRoutingModule } from './pick-film.module.routing';

@NgModule({
  declarations: [
    PickFilmComponent,
    FilmCardShared,
    ListOfMatchedFilmsModalComponent,
  ],
  imports: [CommonModule, IonicModule, SharedModule, PickFilmRoutingModule],
})
export class PickFilmModule {}
