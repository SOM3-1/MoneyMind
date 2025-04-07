import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { app } from './../../../../firebaseConfig'; // Ensure this path is correct

// Correct Budget interface
export interface Budget {
  id: string; // Firestore document ID is a string
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

// Define BudgetContextType
interface BudgetContextType {
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  addBudget: (budget: Budget) => Promise<void>;
  updateBudget: (updatedBudget: Budget) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
}

// Create context
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

// Firestore reference
const db = getFirestore(app);
const budgetsCollection = collection(db, 'budgets');

// BudgetProvider to manage state and Firestore integration
export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Function to fetch budgets from Firestore
  const fetchBudgets = async () => {
    try {
      const querySnapshot = await getDocs(budgetsCollection);
      const budgetList: Budget[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          amount: data.amount,
          startDate: data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate),
          endDate: data.endDate?.toDate ? data.endDate.toDate() : new Date(data.endDate),
        };
      });
      setBudgets(budgetList);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  // Load budgets on component mount
  useEffect(() => {
    fetchBudgets();
  }, []);

  // Add a new budget to Firestore and update local state
  const addBudget = async (budget: Budget) => {
    try {
      // Add document to Firestore
      const docRef = await addDoc(budgetsCollection, {
        title: budget.title,
        amount: budget.amount,
        startDate: budget.startDate,
        endDate: budget.endDate,
      });
      // Immediately update local state with the new budget
      setBudgets((prevBudgets) => [
        ...prevBudgets,
        { ...budget, id: docRef.id },
      ]);
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  // Update an existing budget in Firestore and update local state
  const updateBudget = async (updatedBudget: Budget) => {
    try {
      const budgetDoc = doc(db, 'budgets', updatedBudget.id);
      await updateDoc(budgetDoc, {
        title: updatedBudget.title,
        amount: updatedBudget.amount,
        startDate: updatedBudget.startDate,
        endDate: updatedBudget.endDate,
      });
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) =>
          budget.id === updatedBudget.id ? updatedBudget : budget
        )
      );
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  // Delete a budget from Firestore and update local state
  const deleteBudget = async (id: string) => {
    try {
      const budgetDoc = doc(db, 'budgets', id);
      await deleteDoc(budgetDoc);
      setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  return (
    <BudgetContext.Provider
      value={{ budgets, setBudgets, addBudget, updateBudget, deleteBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// Hook to use BudgetContext
export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
