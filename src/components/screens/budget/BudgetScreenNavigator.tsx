import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EditBudget } from "./EditBudget";
import { Budget } from "./Budget";
import { AddBudget } from "./AddBudget";
const Stack = createStackNavigator();

export const BudgetScreenNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Budget"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Budget" component={Budget} />
      <Stack.Screen name="Edit" component={EditBudget} />
      <Stack.Screen name="Add" component={AddBudget} />
    </Stack.Navigator>
  );
};
