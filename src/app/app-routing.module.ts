import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/authentication/guards/auth.guard';
import { MainLayoutComponent } from './core/layout/components/layout/main-layout.component';
import { AuthLayoutComponent } from './core/layout/components/layout/auth-layout.component';

const routes: Routes = [
  // Rutas de autenticación con AuthLayout
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // Rutas protegidas con MainLayout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
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
      }
    ]
  },

  // Ruta de fallback
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
