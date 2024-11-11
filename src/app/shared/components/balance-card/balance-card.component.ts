import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService, BalanceInfo } from 'src/app/core/services/budget.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-balance-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.scss'
})
export class BalanceCardComponent implements OnInit {

  balanceInfo: BalanceInfo = {
    totalBalance: 0,
    income: 0,
    expenses: 0,
    lastDayBalance: 0
  };
  totalExpenses = 0;

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.getTotalExpenses().subscribe(
      amount => this.totalExpenses = amount
    );
  }
  get isLastDayNegative(): boolean {
    return this.balanceInfo.lastDayBalance < 0;
  }

  get lastDayBalanceAbs(): number {
    return Math.abs(this.balanceInfo.lastDayBalance);
  }}
