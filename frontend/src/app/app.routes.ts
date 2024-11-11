import { Routes } from '@angular/router';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { PlayerCreateComponent } from './components/player-create/player-create.component';
import { PlayerSearchComponent } from './components/player-search/player-search.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/login.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'players/edit/:id', component: EditPlayerComponent, canActivate: [AuthGuard] },
  { path: 'players', component: PlayerSearchComponent, canActivate: [AuthGuard] },
  { path: 'players/:id', component: PlayerDetailsComponent, canActivate: [AuthGuard] },
  { path: 'player-create', component: PlayerCreateComponent, canActivate: [AuthGuard] },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];


