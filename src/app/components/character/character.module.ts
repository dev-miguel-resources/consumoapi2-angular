import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterComponent } from './components/character/character.component';



@NgModule({
  declarations: [
    CharacterComponent, 
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule
  ],
  exports: [
    CharacterComponent, 
    CharacterListComponent
  ]
})
export class CharacterModule { }
