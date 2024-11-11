import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from 'src/app/features/categories/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TransactionFormComponent implements OnInit {
  categories: Category[] = [];
  expenseForm: FormGroup;
  selectedCategory: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      date: [new Date(), Validators.required],
      priority: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.expenseForm.patchValue({ categoryId: category.id });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
      this.router.navigate(['/transactions']);
    }
  }

  onCancel() {
    this.router.navigate(['/transactions']);
  }
}
