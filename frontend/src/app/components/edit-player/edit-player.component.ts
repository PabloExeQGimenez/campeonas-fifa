import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '../../services/players.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  editPlayerForm!: FormGroup;
  playerId!: number;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadPlayerData();
  }

  initForm(): void {
    this.editPlayerForm = this.fb.group({
      long_name: ['', Validators.required],
      club_name: [''],
      overall: ['', Validators.required],
      potential: ['', Validators.required],
      age: ['', Validators.required],
      pace: [''],
      shooting: [''],
      passing: [''],
      dribbling: [''],
      defending: [''],
      physic: ['']
    });
  }

  loadPlayerData(): void {
    this.playerService.getPlayerById(this.playerId).subscribe({
      next: (player) => {
        this.editPlayerForm.patchValue(player.data);
      },
      error: (err) => {
        console.error('Error al cargar los datos de la jugadora:', err);
      }
    });
  }
  

  onSubmit(): void {
    if (this.editPlayerForm.valid) {
      this.playerService.updatePlayer(this.playerId, this.editPlayerForm.value).subscribe({
        next: () => {
          alert('Datos de la jugadora actualizados correctamente');
          this.router.navigate(['/players', this.playerId]);
        },
        error: (err: any) => {
          alert('Ocurrió un error al actualizar los datos.');
        }
      });
    }
  }
}
