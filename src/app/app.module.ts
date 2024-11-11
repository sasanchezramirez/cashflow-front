import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { TransactionsModule } from './features/transactions/transactions.module';
import { CategoriesModule } from './features/categories/categories.module';
import { BudgetsModule } from './features/budgets/budgets.module';
import { SettingsModule } from './features/settings/settings.module';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { FooterComponent } from './core/layout/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    TransactionsModule,
    CategoriesModule,
    BudgetsModule,
    SettingsModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
