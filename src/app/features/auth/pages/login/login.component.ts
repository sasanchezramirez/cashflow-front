import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from 'src/app/core/authentication/services/auth.service';
import { LoginRequest } from 'src/app/core/authentication/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Redirigir si ya está autenticado
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    // Limpiar error previo
    this.errorMessage = null;

    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;

      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status && response.apiCode === 'KO000') {
            this.router.navigate(['/dashboard']);
          } else {
            // Establecer mensaje de error
            this.errorMessage = this.getErrorMessage(response.apiCode, response.message);
            // También mostrar en snackbar
            this.showError(this.errorMessage);
            console.log('ERROR MOSTRADO:', this.errorMessage);
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error de login:', error);
          // Establecer mensaje de error
          this.errorMessage = this.getErrorMessage(error.apiCode, error.message);
          // También mostrar en snackbar
          this.showError(this.errorMessage);
          console.log('ERROR MOSTRADO (from error):', this.errorMessage);
        }
      });
    }
  }

  private getErrorMessage(apiCode: string, defaultMessage?: string): string {
    switch (apiCode) {
      case 'KOU01':
        return 'El usuario ya existe';
      case 'KOU02':
        return 'Usuario no encontrado';
      case 'KOU03':
        return 'Perfil de usuario inválido';
      case 'KOU04':
        return 'Estado de cuenta inválido';
      case 'KOU05':
        return 'ID inválido';
      case 'KOU06':
        return 'Datos de inicio de sesión inválidos';
      case 'KO001':
        return 'La contraseña es incorrecta';
      case 'KO002':
        return 'El usuario no existe';
      case 'KO003':
        return 'La cuenta no está verificada';
      case 'KO004':
        return 'La cuenta está desactivada';
      default:
        return defaultMessage || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    }
  }

  private showError(message: string): void {
    // Usar forzosamente horizontalPosition center para evitar problemas de visibilidad
    this.snackBar.open(message, 'Cerrar', {
      duration: 8000, // Duración más larga para que sea más visible
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
