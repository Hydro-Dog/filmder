import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { GameModes } from './game-mode.models';

@Injectable({ providedIn: 'root' })
export class GameModesService {
  constructor(private http: HttpClient) {}

  getGameModes(): Observable<GameModes[]> {
    return this.http.get<GameModes[]>(`${environment.apiUrl}/api/gamemode`);
  }
}
