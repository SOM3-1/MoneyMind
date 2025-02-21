import React from "react";
import { Text, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { getAuth, signOut } from "firebase/auth";
import { logout } from "@store/appSlice"; 
import { appStore } from "@store/appStore";

export const AccountScreenNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      persistStore(appStore).purge();

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View>
      <Text>{'AccountScreenNavigator'}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};
