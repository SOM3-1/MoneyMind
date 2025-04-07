import { API_URL } from "@env";
import { auth } from "../../firebaseConfig";
import { Transaction } from "@ourtypes/Transaction";

export const getUserTransactions = async (): Promise<Transaction[]> => {
  try {
    const currentUser = auth.currentUser;
    console.log(currentUser?.uid)
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const userId = currentUser.uid;
    const response = await fetch(`${API_URL}/transactions?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch transactions");
    }

    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching transactions:", errorMessage);
    throw error;
  }
};

export const getTransactionById = async (transactionId: string): Promise<Transaction> => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch transaction");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching transaction:", error);
      throw error;
    }
  };
  
  export const updateTransaction = async (transactionId: string, updatedData: { category: string }) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update transaction");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  };
  
  export const deleteTransaction = async (transactionId: string) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete transaction");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
}