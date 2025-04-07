import { AI_URL } from "@env";
import { DateRange, AIFinancialAnalysis } from "@ourtypes/Ai";
import { auth } from "../../firebaseConfig";

/**
 * Fetch AI-powered financial insights for the user.
 * @param dateRange - Time period for financial analysis (default: "this_month").
 * @returns AI-generated financial insights.
 * @throws Error if the fetch request fails.
 */
export const getAIFinancialAnalysis = async (
  dateRange: DateRange = "this_month"
): Promise<AIFinancialAnalysis | null> => {
  try {
    if (!AI_URL) throw new Error("AI_URL is not defined in environment variables");

    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    const requestBody = JSON.stringify({
      user_id: currentUser.uid,  
      date_range: dateRange,   
    });

    console.log("Sending request to AI API:", requestBody); 

    const response = await fetch(`${AI_URL}/predict`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch AI financial analysis. Status: ${response.status}, Error: ${errorText}`);
    }

    const data: AIFinancialAnalysis = await response.json();
    if ("error" in data) {
        return null; 
    }
    return data;
  } catch (error) {
    console.error("Error fetching AI financial analysis:", error);
    return Promise.reject("Failed to retrieve financial insights. Please try again later.");
  }
};
