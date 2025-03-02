import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/enviroments/enviroments';
import { ApiResponse } from 'src/app/models/api-response.model';
import { LoginRequest, RegisterRequest, AuthToken, UserData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authTokenKey = 'authToken';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar autenticación al iniciar el servicio
    this.checkAuthentication();
  }

  /**
   * Iniciar sesión con email y contraseña
   */
  login(credentials: LoginRequest): Observable<ApiResponse<AuthToken>> {
    return this.http.post<ApiResponse<AuthToken>>(
      `${this.apiUrl}${environment.authEndpoints.login}`,
      credentials
    ).pipe(
      tap(response => {
        if (response.status && response.apiCode === 'KO000') {
          this.setSession(response.data.access_token);
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Registrar nuevo usuario
   */
  register(userData: RegisterRequest): Observable<boolean> {
    return this.http.post<ApiResponse<UserData>>(
      `${this.apiUrl}${environment.authEndpoints.register}`,
      userData
    ).pipe(
      map(response => {
        if (response.status && response.apiCode === 'KO000') {
          // Si el registro es exitoso, hacer login automáticamente
          const loginRequest: LoginRequest = {
            email: userData.email,
            password: userData.password
          };

          this.login(loginRequest).subscribe();
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error en registro:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  /**
   * Obtener token almacenado
   */
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  /**
   * Verificar si hay un token válido
   */
  hasValidToken(): boolean {
    const token = this.getToken();
    // Aquí podríamos agregar validación de JWT si es necesario
    return !!token;
  }

  /**
   * Verificar estado de autenticación
   */
  private checkAuthentication(): void {
    const isAuthenticated = this.hasValidToken();
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  /**
   * Guardar sesión
   */
  private setSession(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.isAuthenticatedSubject.next(true);
  }
}
