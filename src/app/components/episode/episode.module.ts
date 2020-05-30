import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpisodeDescription} from 'src/app/core/pipes/episode-description';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { EpisodeRoutingModule } from './episode-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EpisodesService } from '../../core/services/episode/episodes.service';
import { MaterialModule } from '../material/material.module';
import { EpisodeComponent } from './components/episode/episode.component';


@NgModule({
  declarations: [
    EpisodeListComponent,
    EpisodeComponent,
    EpisodeDescription
  ],
  imports: [
    CommonModule,
    EpisodeRoutingModule,
    MaterialModule,
    NgxPaginationModule
  ],
  providers: [
    EpisodesService
  ]
})
export class EpisodeModule { }
