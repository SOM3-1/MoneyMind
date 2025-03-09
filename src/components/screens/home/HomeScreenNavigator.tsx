import React from "react"
import {createStackNavigator} from '@react-navigation/stack';
import { HomeScreen } from "./HomeScreen";
import { EditTransactions } from "./EditTransactions";
const Stack = createStackNavigator();

export const HomeScreenNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="EditTransactions"
        component={EditTransactions}
        initialParams={{ transaction: null }}
      />
    </Stack.Navigator>
  );
};
