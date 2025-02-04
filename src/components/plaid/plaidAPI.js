import axios from "axios";

const BACKEND_URL = "http://yourip:5001";

export const getPlaidLinkToken = async () => {

  console.log("shshhs")
  try {
    const response = await axios.post(`${BACKEND_URL}/api/create_link_token`);
    return response.data.link_token;
  } catch (error) {
    console.error("Error fetching Plaid link token:", error);
    return null;
  }
};

export const exchangePublicToken = async (publicToken) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/exchange_public_token`, {
      public_token: publicToken
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error exchanging public token:", error);
    return null;
  }
};

export const getTransactions = async (accessToken) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/get_transactions`, {
      access_token: accessToken,
    });

    const transactions = response.data;

    transactions.forEach((tx) => {
      tx.customCategory = categorizeTransaction(tx);
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};


export const categorizeTransaction = (transaction) => {
  console.log(transaction)
  if (!transaction.personal_finance_category || !transaction.personal_finance_category.primary) {
    return "Other"; 
  }

  const primaryCategory = transaction.personal_finance_category.primary;

  const categoryMapping = {
    "FOOD_AND_DRINK": "Food & Entertainment",
    "ENTERTAINMENT": "Food & Entertainment",
    "GENERAL_MERCHANDISE": "Shopping",
    "HOME_IMPROVEMENT": "Shopping",
    "HEALTHCARE": "Health & Wellness",
    "PERSONAL_CARE": "Health & Wellness",
    "RENT_AND_UTILITIES": "Essentials",
    "TRANSPORTATION": "Essentials",
    "GENERAL_SERVICES": "Essentials",
    "TRAVEL": "Other",
    "BANK_FEES": "Other",
    "LOAN_PAYMENTS": "Other",
    "TRANSFER_IN": "Other",
    "TRANSFER_OUT": "Other",
    "INCOME": "Other",
    "OTHER": "Other",
  };

  return categoryMapping[primaryCategory] || "Other"; 
};

