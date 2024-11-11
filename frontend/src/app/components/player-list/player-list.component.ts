import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../services/players.service';
import { PlayerTableRowComponent } from "./player-table-row/player-table-row.component";
import { RouterLink } from '@angular/router';
import { PlayerSearchComponent } from '../player-search/player-search.component';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, PlayerTableRowComponent, RouterLink, PlayerSearchComponent],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayersListComponent {
  players: any[] = [];
  currentPage: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  totalPlayers: number = 0;

  constructor(private playersService: PlayersService) {}

  ngOnInit(): void {
    this.getPlayers(this.currentPage, this.limit);
  }

  getPlayers(page: number, limit: number): void {
    this.playersService.getPlayers(page, limit).subscribe({
      next: (response) => {
        this.players = response.data;
        this.currentPage = response.meta.currentPage;
        this.totalPages = response.meta.totalPages;
        this.totalPlayers = response.meta.totalPlayers;
      },
      error: (err) => {
        console.error('Error al obtener las jugadoras', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getPlayers(page, this.limit);
    }
  }
}
