import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Region } from './film.models';

@Injectable({ providedIn: 'root' })
export class FilmService {
  constructor(private http: HttpClient) {}

  getAvailableRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${environment.apiUrl}/api/regions`);
  }
}
