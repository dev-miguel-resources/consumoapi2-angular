import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { EpisodeDescription } from 'src/app/core/pipes/episode-description';
import { EpisodesService } from 'src/app/core/services/episode/episodes.service';
import { MaterialModule } from '../material/material.module';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { EpisodeComponent } from './components/episode/episode.component';
import { EpidoseRoutingModule } from './episode-routing.module';



@NgModule({
  declarations: [
    EpisodeListComponent,
    EpisodeComponent,
    EpisodeDescription
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EpidoseRoutingModule,
    NgxPaginationModule
  ],
  exports: [
    EpisodeListComponent,
    EpisodeComponent
  ],
  providers: [
    EpisodesService
  ]
})
export class EpidoseModule { }
