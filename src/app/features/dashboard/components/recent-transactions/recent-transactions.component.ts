import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BudgetService, Transaction } from 'src/app/core/services/budget.service';
@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.getRecentTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }
}
