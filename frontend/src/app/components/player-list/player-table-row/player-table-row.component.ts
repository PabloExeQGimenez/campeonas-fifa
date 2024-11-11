import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-player-table-row',
  standalone: true,
  imports: [NgFor],
  templateUrl: './player-table-row.component.html',
  styleUrl: './player-table-row.component.css'
})
export class PlayerTableRowComponent {
  @Input() player: any;

}
