import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

// Custom components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Custom pipes
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
];

const COMPONENTS = [
  LoadingSpinnerComponent,
  ConfirmDialogComponent,
];

const PIPES = [
  CurrencyFormatPipe,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
    ...PIPES,
  ]
})
export class SharedModule { }
