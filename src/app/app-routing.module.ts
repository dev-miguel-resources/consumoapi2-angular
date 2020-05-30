import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
            loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'characters',
          loadChildren: () => import('./components/character/character.module').then(m => m.CharacterModule)
      },
      {
        path: 'episodes',
          loadChildren: () => import('./components/episode/episode.module').then(m => m.EpisodeModule)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./components/page-not-found/page-not-found-routing.module').then(m => m.PageNotFoundRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
