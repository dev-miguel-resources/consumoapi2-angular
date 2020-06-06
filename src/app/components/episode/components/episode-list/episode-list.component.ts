import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Episode } from 'src/app/core/models/episode';
import { EpisodesService } from 'src/app/core/services/episode/episodes.service';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  episodeList: Episode[];

  constructor(private episodesService: EpisodesService) { 
    
  }

  ngOnInit() {
    this.searchSeasson('S01');
  }

  searchSeasson(seasson: string): void {
    this.episodesService.findEpisodesBySeasson(seasson).pipe(take(1)).subscribe(
      response => {
        this.episodeList = response.results;
        this.episodeList.forEach(episode => {
          episode.image = this.getImageForSeasson(seasson);
        });
      }
    );
  }

  private getImageForSeasson(seasson: string): string {
    let image = '';
    if (seasson === 'S01') {
      image = 'assets/images/seasson_1.jpg';
    } else if (seasson === 'S02') {
      image = 'assets/images/seasson_2.jpg';
    } else {
      image = 'assets/images/seasson_3.jpg';
    }
    return image;
  }


}
