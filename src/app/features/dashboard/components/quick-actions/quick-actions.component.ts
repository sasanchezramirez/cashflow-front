import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss'
})
export class QuickActionsComponent {
  constructor(private router: Router) {}

  actions = [
    {
      title: 'Add Expense',
      icon: 'add_circle',
      action: 'expense',
      bgColor: '#4F46E5'
    },
    {
      title: 'Recurring',
      icon: 'calendar_today',
      action: 'recurring',
      bgColor: '#8B5CF6'
    }
  ];

  handleAction(action: string) {
    if (action === 'expense') {
      this.router.navigate(['/transactions/new']);
    }
  }
}


