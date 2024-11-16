import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TransactionsService } from '../../services/transactions.service';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Router } from '@angular/router';
import { RecurringExpenseFormComponent } from '../../components/recurring-expense-form/recurring-expense-form.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recurrent-expenses',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './recurrent-expenses.component.html',
  styleUrl: './recurrent-expenses.component.scss'
})
export class RecurrentExpensesComponent implements OnInit {
  recurringExpenses: any[] = [];
  categories: any[] = [];

  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRecurringExpenses();
    this.loadCategories();
  }

  loadRecurringExpenses() {
    this.transactionsService.getRecurringExpenses()
      .subscribe(expenses => this.recurringExpenses = expenses);
  }

  loadCategories() {
    this.categoriesService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getCategoryIcon(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.icon : 'help_outline';
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.color : '#666666';
  }

  openExpenseForm(expense: any) {
    const dialogRef = this.dialog.open(RecurringExpenseFormComponent, {
      width: '400px',
      data: { expense }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const transaction = {
          ...expense,
          amount: result.amount,
          date: result.date
        };

        // this.transactionsService.createTransaction(transaction)
        //   .subscribe(() => {
        //     this.router.navigate(['/transactions']);
        //   });
      }
    });
  }
}
