import { AfterViewInit, Component, OnInit } from '@angular/core';
// tslint:disable-next-line: max-line-length
import {MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition} from '@angular/material';
import { Observable } from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import { Character } from '../../../../core/models/character';
import { SearchResult } from '../../../../core/models/response/search-results';
import { Search } from '../../../../core/models/search/search';
import { CharactersService } from '../../../../core/services/character/characters.service';
import {UtilFunctions} from 'src/app/utils/CommonsUtils';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  loading = true;
  showDefaultGrid: boolean;
  test: boolean;
  characterList: Character[];
  mySwiper: Swiper;

  totalRecords: number;
  page: number;
  pageSize: number;
  asyncCharacterList: Observable<Character[]>;

  constructor(private charactersService: CharactersService, private snackBar: MatSnackBar) {
    this.showDefaultGrid = true;
    this.test = false;
    this.characterList = [];
    this.page = 1;
    this.pageSize = 20;
    this.totalRecords = 0;
  }

  ngOnInit() {
    this.findCharactersByLucky(); // cargo inicialmente los primeros personajes hasta 9 registros
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container');
  }

  doSearch(event: Search): void {
    if (event) {
      this.test = true;
      this.page = 1;
      if (this.searchingById(event)) {
        this.findCharacter(event.id);
      } else {
        this.showDefaultGrid = false;
        this.characterList = [];
        this.loading = true;
        this.getCharacterList(event);
      }
    }
  }

  doTryLuck(event: boolean): void {
    if (event) {
      this.loading = true;
      this.showDefaultGrid = false;
      this.test = false;
      this.totalRecords = 0;
      this.showSnackBar();
      this.findCharactersByLucky();
    }
  }

  pageChanged(page: number): void { // guardo la pagina y cambio el valor de la busqueda del método
    this.page = page;
    this.getCharacterList(null);
  }

  private findCharactersByLucky(): void {
      this.charactersService.findAllCharacters().pipe(take(1)).subscribe(resp => {
        this.findCharactersByIds(resp.info.count, 9);
      });
  }

  private findCharactersByIds(totalCharacters: number, charactersToShow: number ): void {
      const ids = UtilFunctions.getRandomIdsToFinds(totalCharacters, charactersToShow);
      this.charactersService.findCharactersByIds(ids).pipe(take(1)).subscribe(response => {
          this.characterList = response;
          this.loading = false;
          this.showDefaultGrid = true;
        });
  }

  // tslint:disable-next-line: max-line-length
  private getCharacterList(search: Search): void { // maneja toda la carga de los personajes, la guardo en esa propiedad para luego hacer el recorrido asincrono
    this.asyncCharacterList = this.loadCharacters(search).pipe(
      tap(response => {
        this.totalRecords = response.info.count;
        this.loading = false;
      }),
      map (response => response.results)
    );
  }

  // tslint:disable-next-line: max-line-length
  private loadCharacters(search: Search): Observable<SearchResult<Character>> { // retorna el servicio donde lo que se obtiene es una estructura del observable de arriba
    return this.charactersService.findByFiltersAndPage(search, this.page);
  }

  private findCharacter(id: number): void { // busca un personaje por id
    let doFindById = true;
    if (this.characterList.length === 1) {
      if (this.characterList[0].id === id) {
        doFindById = false;
      }
    }

    if (doFindById) {
      this.findCharacterById(id.toString());
    }
  }

  private findCharacterById(id: string): void {  // llama al servicio obtiene personajes por id y lo arregla al listado
      this.showDefaultGrid = false;
      this.characterList = [];
      this.loading = true;
      this.charactersService.findById(id).pipe(take(1)).subscribe(
        response => {
          this.characterList.push(response);
          this.loading = false;
          this.showDefaultGrid = true;
        });
  }

  private searchingById(search: Search): boolean { // cambia o no el valor de mi propiedad booleana si viene o no la busqueda
      let itsTrue = false;
      if (search && search.id !== 0) {
          itsTrue = true;
      }
      return itsTrue;
  }

  private showSnackBar(): void { // configura todo mi snack de material cuando se abra el snack
    const message = 'Wubba Lubba Dub Dub !';
    const setAutoHide = true;
    const autoHide = 1500;
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    const config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = setAutoHide ? autoHide : 0;
    this.snackBar.open(message, undefined, config);
  }

}
