import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss'
})
export class QuickActionsComponent {
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
}
