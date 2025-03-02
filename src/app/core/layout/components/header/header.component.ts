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
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
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
