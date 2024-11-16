export interface RecurringExpense {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  priority: number;
  lastAmount?: number;
}
