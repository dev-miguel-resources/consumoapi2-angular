import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Search } from 'src/app/core/models/search/search';

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent implements OnInit {

  @Output() public filters = new EventEmitter<Search>();
  @Output() public tryLuck = new EventEmitter<boolean>();

  characterId: string;
  characterName: string;
  characterStatus: string;
  characterGender: string;

  constructor() { 
    this.characterId = ''
    this.characterName = '';
  }

  ngOnInit() {
  }

  search() : void {
    let search: Search = new Search();
    search.id = this.getId();
    search.name = this.characterName;
    search.status = this.characterStatus;
    search.gender = this.characterGender;
    this.filters.emit(search);
  }

  doTryLuck(): void {
    this.tryLuck.emit(true);
  }

  private getId(): number {
    let id = 0;
    if (this.characterId && this.characterId !== '') {
      id = parseFloat(this.characterId);
    } 
    return id;
  }

}
