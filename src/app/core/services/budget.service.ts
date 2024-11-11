import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BudgetCategory {
  name: string;
  current: number;
  limit: number;
  color: string;
}

export interface BalanceInfo {
  totalBalance: number;
  income: number;
  expenses: number;
  lastDayBalance: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  getTotalExpenses(): Observable<number> {
    return of(1041.68);
  }

  getBudgetCategories(): Observable<BudgetCategory[]> {
    return of([
      {
        name: 'Groceries',
        current: 250,
        limit: 300,
        color: '#3B82F6'
      },
      {
        name: 'Transport',
        current: 120,
        limit: 150,
        color: '#10B981'
      }
    ]);
  }

  getBalanceInfo(): Observable<BalanceInfo> {
    return of({
      totalBalance: 2458.32,
      income: 3500.00,
      expenses: 1041.68,
      lastDayBalance: -85.32 // Valor negativo indica gasto
    });
  }
}
