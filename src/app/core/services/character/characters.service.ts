import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Character } from '../../models/character';
import { SearchResult } from '../../models/response/search-results';
import { Search } from '../../models/search/search';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) {

   }

  findAllCharacters() {
    return this.http.get<any>(`${environment.RICKANDMORTY_API}/character/`);
  }

  findCharactersByIds(ids: any) {
    return this.http.get<any>(`${environment.RICKANDMORTY_API}/character/${ids}`);
  }

  findByFiltersAndPage(search: Search, page: number): Observable<SearchResult<Character>> {
      let url = `${environment.RICKANDMORTY_API}/character?`;
      if (search) {
        if(search.name !== '') {
          url += `name=${search.name}`;
        }
        if (search.gender) {
          url += url.includes('=') ? `&gender=${search.gender}` : `gender=${search.gender}`;
        }
        if (search.status) {
          url += url.includes('=') ? `&status=${search.status}` : `status=${search.status}`;
        }
      } else {
        url += `page=${page}`;
      }
      return this.http.get<any>(url);
  }

  findById(id: string) {
    return this.http.get<any>(`${environment.RICKANDMORTY_API}/character/${id}`);
  }
}
