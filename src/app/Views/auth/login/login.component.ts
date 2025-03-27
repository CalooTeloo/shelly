import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  imports:[FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    if (!this.validateFields()) return;
  
    try {
      await this.authService.login(this.email, this.password);
      // Redirecciona a la vista principal o a la lista de peseras
      this.router.navigate(['/pesera-list']);
    } catch (error) {
      this.errorMessage = 'Correo o contraseña incorrectos.';
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

    this.errorMessage = '';
    return true;
  }
}
