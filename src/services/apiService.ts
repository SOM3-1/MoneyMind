import { API_URL } from "@env";
export const registerUser = async (userId: string, name: string, email: string) => {
  console.log(API_URL,userId, name, email , `${API_URL}/register`)
    try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        name,
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error:any) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const pubicTokenApi = async (payload: any,) => {
  console.log(payload, `${API_URL}/exchange_public_token`)
    try {
    const response = await fetch(`${API_URL}/exchange_public_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_token:payload,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error:any) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const createLinkToken = async (payload: any,) => {
  console.log(payload, `${API_URL}/create_link_token`)
    try {
    const response = await fetch(`${API_URL}/create_link_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId:payload.userId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error:any) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const getTransactionToken = async (payload: any,) => {
  console.log(payload, `${API_URL}/create_link_token`)
    try {
    const response = await fetch(`${API_URL}/get_transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token:payload.access_token,
        userId:payload.userId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error:any) {
    console.error("API Error:", error.message);
    throw error;
  }
};
export const getUsserTransactions = async (payload: any,) => {
  console.log(payload, `${API_URL}/get_transactions/${payload.userId}`)
    try {
    const response = await fetch(`${API_URL}/get_transactions/${payload.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error:any) {
    console.error("API Error:", error.message);
    throw error;
  }
};
export const deleteTransaction = async (payload: any,) => {
  console.log(payload, `${API_URL}/delete_transaction/${payload.transactionId}}`)
    try {
    const response = await fetch(`${API_URL}/delete_transaction/${payload.transactionId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error:any) {
    console.error("API Error:", error.message);
    throw error;
  }
};
export const updateTransaction = async (payload: any,) => {
  console.log(payload, `${API_URL}/update_transaction/${payload.transactionId}`)
    try {
    const response = await fetch(`${API_URL}/update_transaction/${payload.transactionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: payload.amount,
        description: payload.description,
        category: payload.category,
        date: payload.date,
        paid_to: payload.paid_to,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error:any) {
    console.error("API Error:", error.message);
    throw error;
  }
};
