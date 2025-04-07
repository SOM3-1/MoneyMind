import { CategoryType } from "./Category";

interface CategoryData {
  [category: string]: number;
}
export interface AIFinancialAnalysis {
  total_expenses: number;
  exceeded_budget: number;
  exceeded_categories: CategoryData;
  expense_trend: string;
  spending_trend: string;
  future_risk_prediction: string;
  savings: {
    amount: number;
    percentage: string;
  };
  budget_utilization: {
    percentage: string;
    change: string;
  };
  potential_savings: {
    category: string;
    saved_amount: number;
  };
  constant_spending: {
    category: string;
    amount: number;
  };
  top_spending_category: {
    category: string;
    amount: number;
  };
  low_spending_category: {
    category: string;
    amount: number;
  };
  predicted_future_expenses: number;
  predicted_savings_next_month: number;
  abnormal_spending_alerts: string[];
  warnings: string[];
  total_budget: number;
  categories: Partial<Record<CategoryType, number>>;
}

export type DateRange =
  | "this_month"
  | "past_month"
  | "past_3_months"
  | "past_6_months"
  | "past_year";
