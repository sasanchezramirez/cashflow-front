import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/authentication/services/auth.service';
import { RegisterRequest } from 'src/app/core/authentication/models/auth.model';

// Añadir esta interfaz para la respuesta del servidor
interface AuthResponse {
  status: boolean;
  apiCode: string;
  message?: string;
  data?: any;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)
      ]],
      termsAgreed: [false, [Validators.requiredTrue]]
    });

    // Redirigir si ya está autenticado
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;

      // Crear objeto RegisterRequest con todos los campos requeridos
      const registerData: RegisterRequest = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        profile_id: 1, // Valor predeterminado para usuario normal
        status_id: 1   // Valor predeterminado para cuenta activa
      };

      this.authService.register(registerData).subscribe({
        next: (response: any) => { // Usar 'any' temporalmente para evitar errores
          // Verificar si la respuesta es un objeto
          if (response && typeof response === 'object') {
            // Tratar la respuesta como AuthResponse
            const authResponse = response as AuthResponse;

            if (authResponse.status && authResponse.apiCode === 'KO000') {
              this.snackBar.open('Cuenta creada con éxito. Verifica tu correo para activarla.', 'Cerrar', {
                duration: 5000,
              });
              this.router.navigate(['/auth/login']);
            } else if (authResponse.message) {
              this.showError('Error en el registro: ' + authResponse.message);
            } else {
              this.showError('Error en el registro');
            }
          } else {
            this.showError('Respuesta del servidor inválida');
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error de registro:', error);
          this.showError('Error al crear la cuenta. Por favor, inténtelo de nuevo.');
          this.isLoading = false;
        }
      });
    }
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (passwordControl?.hasError('pattern')) {
      return 'La contraseña no cumple con los requisitos';
    }
    return '';
  }

  hasUpperCase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password ? /[A-Z]/.test(password) : false;
  }

  hasLowerCase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password ? /[a-z]/.test(password) : false;
  }

  hasNumber(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password ? /\d/.test(password) : false;
  }

  hasSpecialChar(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password ? /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) : false;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
    });
  }
}
