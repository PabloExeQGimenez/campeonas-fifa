import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error al registrar el usuario';
      }
    });
  }
}
