import { Component, Input, OnInit } from '@angular/core';
import { Episode } from 'src/app/core/models/episode';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  @Input() episode: Episode;

  constructor() { }

  ngOnInit() {
  }

}
