export interface Transaction {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: Date;
  isExpense: boolean;
  isRecurring: boolean;
  recurringId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionRequest {
  amount: number;
  description: string;
  categoryId: string;
  date: Date;
  isExpense: boolean;
  isRecurring: boolean;
  recurringDetails?: RecurringDetails;
}

export interface RecurringDetails {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  endDate?: Date;
  interval?: number;
}
