import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Character } from 'src/app/core/models/character';
import { SearchResult } from 'src/app/core/models/response/search-results';
import { Search } from 'src/app/core/models/search/search';
import { CharactersService } from 'src/app/core/services/character/characters.service';
import { UtilFunctions } from 'src/app/utils/CommonsUtils';
import Swiper from 'swiper';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  loading: boolean = true;
  showDefaultGrid: boolean;
  test: boolean;
  characterList: Character[];
  mySwiper: Swiper;
  
  totalRecords: number;
  page: number;
  pageSize: number;
  asyncCharacterList: Observable<Character[]>;

  constructor(private charactersService: CharactersService, private snackBar: MatSnackBar) {
    this.showDefaultGrid = false;
    this.test = false;
    this.characterList = [];
    this.page = 1;
    this.pageSize = 20;
    this.totalRecords = 0;
  }

  ngOnInit() {
    this.findCharactersByLucky();
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

  pageChanged(page: number): void {
    this.page = page;
    this.getCharacterList(null);
  }

  private findCharactersByLucky(): void {
    this.charactersService.findAllCharacters().pipe(take(1)).subscribe(resp => {
        this.findCharactersByIds(resp.info.count, 9);
    });
  }

  private findCharactersByIds(totalCharacters: number, charactersToShow: number): void {
    let ids = UtilFunctions.getRamdomIdsToFinds(totalCharacters, charactersToShow);
        this.charactersService.findCharactersByIds(ids).pipe(take(1)).subscribe(response => {
          this.characterList = response;
          this.loading = false;
          this.showDefaultGrid = true;
        });
  }

  private getCharacterList(search: Search): void {
    this.asyncCharacterList = this.loadCharacters(search).pipe( 
      tap(response => {
        this.totalRecords = response.info.count;
        this.loading = false;
      }),
      map (response => response.results)
    );
  }

  private loadCharacters(search: Search): Observable<SearchResult<Character>>  {
    return this.charactersService.findByFiltersAndPage(search, this.page);
  }

  private findCharacter(id: number): void {
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

  private findCharacterById(id: string): void {
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

  private searchingById(search: Search): boolean {
    let itstrue = false;
    if (search && search.id !== 0) {
        itstrue = true;
    }
    return itstrue;
  }

  private showSnackBar(): void {
    let message: string = 'Wubba Lubba Dub Dub !';
    let setAutoHide: boolean = true;
    let autoHide: number = 1500;
    let horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    let verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    let config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = setAutoHide ? autoHide : 0;
    this.snackBar.open(message, undefined, config);
  }

}
