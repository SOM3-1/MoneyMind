import { API_URL } from "@env";
import { auth } from "../../firebaseConfig";

/**
 * Fetch all budget transactions for the authenticated user.
 * @returns Promise<any[]> - A list of budget transactions.
 */
export const getUserBudgetTransactions = async (): Promise<any[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const userId = currentUser.uid;
    const response = await fetch(`${API_URL}/budget-transactions?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch budget transactions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching budget transactions:", error);
    throw error;
  }
};