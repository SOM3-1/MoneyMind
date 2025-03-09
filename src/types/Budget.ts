export interface Budget {
    id: string;
    userId: string;
    amount: number;
    title: string;
    fromDate: string;
    toDate: string;
    categoryTotals?: Record<string, number>;
  }