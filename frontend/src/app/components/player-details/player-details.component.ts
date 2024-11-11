import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { PlayersService } from '../../services/players.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlayerSkillsChartComponent } from '../player-skills-chart/player-skills-chart.component';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, PlayerSkillsChartComponent, RouterModule],
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  player: any;
  playerSkills: any;
  playerId!: number;
  playerData: any;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playersService.getPlayerById(+id).subscribe((data) => {

        this.player = data.data;

        this.playerSkills = {
          pace: this.player.pace,
          shooting: this.player.shooting,
          passing: this.player.passing,
          dribbling: this.player.dribbling,
          defending: this.player.defending,
          physic: this.player.physic
        };

        console.log("Habilidades de la jugadora:", this.playerSkills);
      });
    }
  }
}
