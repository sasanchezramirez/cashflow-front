import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <div class="auth-layout">
      <app-header></app-header>
      <main class="auth-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .auth-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AuthLayoutComponent {}
