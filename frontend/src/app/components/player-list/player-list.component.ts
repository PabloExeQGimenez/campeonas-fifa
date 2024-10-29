// src/app/components/players-list/players-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule], // Añade CommonModule aquí
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayersListComponent {
  players: any[] = [];       // Lista de jugadoras
  currentPage: number = 1;    // Página actual
  limit: number = 10;         // Límite de jugadoras por página
  totalPages: number = 0;     // Total de páginas
  totalPlayers: number = 0;   // Total de jugadoras

  constructor(private playersService: PlayersService) {}

  ngOnInit(): void {
    this.getPlayers(this.currentPage, this.limit);
  }

  // Método para obtener la lista de jugadoras con paginación
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

  // Método para cambiar de página
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getPlayers(page, this.limit);
    }
  }
}
