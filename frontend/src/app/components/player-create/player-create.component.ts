import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayersService } from '../../services/players.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent {
  playerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
    private router: Router
  ) {
    this.playerForm = this.fb.group({
      fifa_version: ['', [Validators.required]],
      fifa_update: ['', [Validators.required]],
      player_face_url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/)]],
      long_name: ['', [Validators.required, Validators.minLength(3)]],
      player_positions: ['', [Validators.required]],
      overall: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      potential: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      age: [18, [Validators.required, Validators.min(15), Validators.max(50)]],
      club_name: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      skills: this.fb.group({
        pace: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
        shooting: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
        dribbling: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
        defense: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
        passing: [50, [Validators.required, Validators.min(0), Validators.max(100)]]
      })
    });
  }

  onSubmit(): void {
    
    Object.keys(this.playerForm.controls).forEach((key) => {
      const control = this.playerForm.get(key);
      
    });

    if (this.playerForm.valid) {
      this.playersService.createPlayer(this.playerForm.value).subscribe({
        next: () => {
          alert('Jugadora creada con éxito');
          this.router.navigate(['/players']);
        },
        error: (err) => {
          alert('Error al crear la jugadora.');
        }
      });
    } else {
      alert('Completa correctamente el formulario.');
    }
  }
}
