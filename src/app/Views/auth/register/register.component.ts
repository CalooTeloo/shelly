import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-register',
  imports:[ FormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  cedula: string = '';
  pesera: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    if (!this.validateFields()) return;

    try {
      await this.authService.register(this.email, this.password, this.username, this.cedula, this.pesera);
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage = 'Error al registrar. Intenta de nuevo.';
    }
  }

  validateFields(): boolean {
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.errorMessage = 'Ingresa un correo válido.';
      return false;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      return false;
    }

    if (!/^\d{10}$/.test(this.cedula)) {
      this.errorMessage = 'La cédula debe tener exactamente 10 dígitos numéricos.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }
}
