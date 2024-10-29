// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PlayersListComponent } from './components/player-list/player-list.component';

export const appRoutes: Routes = [
  { path: 'players', component: PlayersListComponent },
  { path: '', redirectTo: '/players', pathMatch: 'full' } // Redirige la raíz a /players
];
