// transactions.service.ts (versión mock)
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecurringExpense } from 'src/app/models/transaction.model';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor() {}

  createTransaction(transaction: any): Observable<any> {
    // Simula una respuesta exitosa
    return of({ success: true });
  }

  getRecurringExpenses(): Observable<RecurringExpense[]> {
    // Devuelve una lista de gastos recurrentes mockeados
    const mockExpenses: RecurringExpense[] = [
      {
        id: '1',
        name: 'Suscripción a Netflix',
        categoryId: 'entertainment',
        description: 'Servicio de streaming',
        priority: 1,
        lastAmount: 15.99
      },
      {
        id: '2',
        name: 'Membresía de gimnasio',
        categoryId: 'health',
        description: 'Pago mensual',
        priority: 2,
        lastAmount: 30.00
      },
      // Agrega más gastos si lo deseas
    ];
    return of(mockExpenses);
  }
}
