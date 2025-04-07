// types.ts
export type RootStackParamList = {
  BudgetScreen: undefined;
  AddBudget: undefined;
  EditBudget: { budget: Budget };
};
export type Budget = {
  id: string;
  title: string;
  amount: number;
  startDate: string | Date; // Allow both string and Date
  endDate: string | Date; // Allow both string and Date
};

