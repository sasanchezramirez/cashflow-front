import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  getCategories(): Observable<Category[]> {
    return of([
      { id: '1', name: 'Groceries', icon: 'shopping_cart', color: '#3B82F6' },
      { id: '2', name: 'Transport', icon: 'directions_car', color: '#10B981' },
      { id: '3', name: 'Entertainment', icon: 'movie', color: '#F59E0B' }
    ]);
  }
}
