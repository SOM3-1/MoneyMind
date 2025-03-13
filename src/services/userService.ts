import { API_URL } from "@env";
import { auth } from "./../../firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";

export const getUserDetails = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(new Error("User not authenticated"));
        return;
      }

      const userId = user.uid;
      console.log(`Fetching user details for userId: ${userId} from ${API_URL}/users/${userId}`);

      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user details");
        }

        const userData = await response.json();
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const getUserName = async ():Promise<string> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(new Error("User not authenticated"));
        return;
      }

      const userId = user.uid;

      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user details");
        }

        const userData = await response.json();
        resolve(userData?.name || '');
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const getUserId = async (): Promise<string | null> => {
  const currentUser = auth.currentUser;
  return currentUser ? currentUser.uid : null;
};
