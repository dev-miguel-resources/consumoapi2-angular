import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) { 

  }

  findEpisodesBySeasson(seasson: string) {
    return this.http.get<any>(`${environment.RICKANDMORTY_API}/episode?episode=${seasson}`);
  }
}
