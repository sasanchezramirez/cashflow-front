import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  navigationItems = [
    {
      icon: 'home',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'pie_chart',
      label: 'Budget',
      route: '/budgets'
    },
    {
      icon: 'category',
      label: 'Categories',
      route: '/categories'
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: '/settings'
    }
  ];
}
