import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  {
    path: 'auth', 
    loadChildren: () => 
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard', 
    loadChildren: () => 
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'transactions', 
    loadChildren: () => 
      import('./features/transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path: 'categories', 
    loadChildren: () => 
      import('./features/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'budgets', 
    loadChildren: () => 
      import('./features/budgets/budgets.module').then(m => m.BudgetsModule)
  },
  {
    path: 'settings', 
    loadChildren: () => 
      import('./features/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: '**', 
    redirectTo: 'dashboard'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
