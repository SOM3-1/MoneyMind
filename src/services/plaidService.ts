import axios from "axios";
import { API_URL } from "@env";
import { getUserId } from "./userService";

export const getPlaidLinkToken = async (): Promise<string | null> => {
    try {
        const userId = await getUserId();
        if (!userId) {
            return null;
        }
        const response = await axios.post(`${API_URL}/plaid/create_link_token`, {
            userId,
        });
        return response.data.link_token;
    } catch (error) {
        console.error("Error fetching Plaid link token:", error);
        return null;
    }
};

export const exchangePublicToken = async (publicToken: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${API_URL}/plaid/exchange_public_token`, { public_token: publicToken });
        return response.data.access_token;
    } catch (error) {
        console.error("Error exchanging public token:", error);
        return null;
    }
};

export const syncTransactions = async () => {
    try {
        const userId = await getUserId();
        if (!userId) {
            console.error("User not authenticated");
            return { success: false, message: "User not authenticated" };
        }

        const token = await getPlaidLinkToken();
        if (!token) {
            console.error("Failed to retrieve link token");
            return { success: false, message: "Failed to retrieve link token" };
        }

        return { success: true, linkToken: token };
    } catch (error) {
        console.error("Error in transaction sync process:", error);
        return { success: false, message: "Error syncing transactions" };
    }
};

export const getTransactions = async (accessToken: string): Promise<boolean | null> => {
    try {
        const userId = await getUserId();
        if (!userId) {
            console.error("User not authenticated");
            return null;
        }

        const response = await axios.post(`${API_URL}/plaid/get_transactions`, {
            access_token: accessToken,
            userId
        });

        if (response.data.success) {
            return true; 
        } else {
            console.error("Failed to sync transactions");
            return null; 
        }
    } catch (error) {
        console.error("Error fetching transactions:", error.response?.data || error.message);
        return null; 
    }
};
