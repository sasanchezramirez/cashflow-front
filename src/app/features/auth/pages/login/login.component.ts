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
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;

      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          if (response.status && response.apiCode === 'KO000') {
            this.router.navigate(['/dashboard']);
          } else {
            this.showError('Error de autenticación: ' + response.message);
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.showError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
          this.isLoading = false;
        }
      });
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
    });
  }
}
