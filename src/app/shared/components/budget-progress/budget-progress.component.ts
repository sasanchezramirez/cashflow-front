import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetCategory, BudgetService } from 'src/app/core/services/budget.service';
@Component({
  selector: 'app-budget-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="budget-card">
      <h2 class="budget-card__title">Monthly Budget</h2>
      <div class="budget-list">
        <div class="budget-item" *ngFor="let category of categories">
          <div class="budget-item__header">
            <span class="budget-item__name">{{category.name}}</span>
            <span class="budget-item__amount">\${{category.current}}/\${{category.limit}}</span>
          </div>
          <div class="budget-item__progress">
            <div class="budget-item__bar"
                 [style.width]="(category.current/category.limit * 100) + '%'"
                 [style.background-color]="category.color">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .budget-card {
      background-color: var(--surface-color);
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: var(--card-shadow);

      &__title {
        color: var(--text-secondary);
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }
    }

    .budget-item {
      margin-bottom: 1rem;

      &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }

      &__name {
        color: var(--text-primary);
        font-weight: 500;
      }

      &__amount {
        color: var(--text-secondary);
      }

      &__progress {
        height: 0.5rem;
        background-color: var(--surface-elevated);
        border-radius: 0.25rem;
        overflow: hidden;
      }

      &__bar {
        height: 100%;
        transition: width 0.3s ease;
      }
    }
  `]
})
export class BudgetProgressComponent implements OnInit {
  categories: BudgetCategory[] = [];

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.getBudgetCategories().subscribe(
      categories => this.categories = categories
    );
  }
}
