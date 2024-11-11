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

export interface Transaction {
  id: string;
  category: {
    name: string;
    icon: string;
  };
  description: string;
  amount: number;
  date: Date;
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

  getRecentTransactions(): Observable<Transaction[]> {
    return of([
      {
        id: '1',
        category: {
          name: 'Groceries',
          icon: 'shopping_cart'
        },
        description: 'Walmart',
        amount: -85.32,
        date: new Date()
      },
      {
        id: '2',
        category: {
          name: 'Transport',
          icon: 'directions_car'
        },
        description: 'Gas Station',
        amount: -45.00,
        date: new Date()
      }
    ]);
  }
}
