import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <a routerLink="/" class="logo">CashFlow</a>
        </div>

        <div class="header-right">
          <button
            mat-icon-button
            (click)="toggleTheme()"
            class="theme-toggle"
            [attr.aria-label]="isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'">
            <mat-icon>{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <button
            *ngIf="isAuthenticated"
            mat-icon-button
            (click)="logout()"
            class="logout-button"
            aria-label="Cerrar sesión">
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--surface-color);
      box-shadow: var(--header-shadow);
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.75rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .theme-toggle, .logout-button {
      color: var(--text-secondary);
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }
    }

    .logout-button:hover {
      color: var(--error-color);
    }

    mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
  `]
})
export class HeaderComponent implements OnInit {
  isDarkMode!: boolean;
  isAuthenticated = false;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.isDarkMode = theme === 'dark';
    });

    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }
}
