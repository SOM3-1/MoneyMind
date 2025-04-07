import { API_URL } from "@env";
import { auth } from "../../firebaseConfig";
import { Budget } from "@ourtypes/Budget";

/**
 * Fetch all budgets for the authenticated user.
 * @returns List of budgets
 */
export const getBudgets = async (): Promise<Budget[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    const response = await fetch(`${API_URL}/budgets?userId=${currentUser.uid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch budgets");
    return await response.json();
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
};

/**
 * Fetch a single budget by ID.
 * @param budgetId - The unique budget ID
 * @returns The budget details
 */
export const getBudgetById = async (budgetId: string): Promise<Budget> => {
  try {
    const response = await fetch(`${API_URL}/budgets/${budgetId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch budget");
    return await response.json();
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
};

/**
 * Create a new budget for the authenticated user.
 * @param budgetData - Budget details excluding userId
 * @returns Created budget response
 */
export const createBudget = async (budgetData: Omit<Budget, "id" | "userId">): Promise<Budget> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    const response = await fetch(`${API_URL}/budgets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...budgetData, userId: currentUser.uid }),
    });

    if (!response.ok) throw new Error("Failed to create budget");
    return await response.json();
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};

/**
 * Update an existing budget.
 * @param budgetId - ID of the budget to update
 * @param updates - Updated budget data
 * @returns Success message
 */
export const updateBudget = async (budgetId: string, updates: Partial<Budget>): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/budgets/${budgetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update budget");
    return await response.json();
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
};

/**
 * Delete a budget.
 * @param budgetId - ID of the budget to delete
 * @returns Success message
 */
export const deleteBudget = async (budgetId: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/budgets/${budgetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to delete budget");
    return await response.json();
  } catch (error) {
    console.error("Error deleting budget:", error);
    throw error;
  }
};
