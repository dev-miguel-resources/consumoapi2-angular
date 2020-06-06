import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../models/episode';

@Pipe({
  name: 'description'
})
export class EpisodeDescription implements PipeTransform {
    
    transform(episode: Episode) {
        const number = episode.episode.split('E')[1];
        return `Episode ${number} - ${episode.name}`;
    }
}