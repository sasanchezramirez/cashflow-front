import { Component } from '@angular/core';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { BudgetProgressComponent } from 'src/app/shared/components/budget-progress/budget-progress.component';
import { BalanceCardComponent } from 'src/app/shared/components/balance-card/balance-card.component';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QuickActionsComponent,
    BudgetProgressComponent,
    BalanceCardComponent,
    RecentTransactionsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
