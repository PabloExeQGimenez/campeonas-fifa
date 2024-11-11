import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-player-search',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {
  searchTerm: string = '';
  selectedClub: string = '';
  clubs: string[] = [];
  players: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  constructor(private playerService: PlayersService) {}

  ngOnInit() {
    this.loadClubs();
    this.loadPlayers();
  }

  loadClubs() {
    this.playerService.getClubs().subscribe({
      next: (response: any) => {
        this.clubs = response.data;
      },
      error: (error: any) => {
        console.error('Error al cargar los clubes:', error);
      }
    });
  }

  loadPlayers() {
    this.playerService.getPlayers(this.currentPage, this.pageSize, this.searchTerm, this.selectedClub)
      .subscribe({
        next: (response: any) => {
          this.players = response.data;
          this.totalPages = response.meta.totalPages;
        },
        error: (error: any) => {
          console.error('Error al cargar jugadoras:', error);
        }
      });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadPlayers();
  }

  onClubChange() {
    this.currentPage = 1;
    this.loadPlayers();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPlayers();
    }
  }

  downloadCSV(): void {
    this.playerService.getPlayers(1, 100, this.searchTerm, this.selectedClub).subscribe({
      next: (response: any) => {
        const data = response.data;
        this.exportToCSV(data, 'jugadoras_filtradas.csv');
      },
      error: (error: any) => {
        console.error('Error al descargar CSV:', error);
      }
    });
  }

  exportToCSV(data: any[], filename: string): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jugadoras');

    const csvData = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  }
}
