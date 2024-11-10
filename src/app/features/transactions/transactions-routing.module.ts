// src/app/features/transactions/transactions-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './pages/transaction-detail/transaction-detail.component';

const routes: Routes = [
  { path: '', component: TransactionListComponent },
  { path: ':id', component: TransactionDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
