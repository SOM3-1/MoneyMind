import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EditBudget } from "./EditBudget";
import { BudgetScreen } from "./BudgetScreen";
import { AddBudget } from "./AddBudget";
const Stack = createStackNavigator();

export const BudgetScreenNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Budget"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Budget" component={BudgetScreen} />
      <Stack.Screen name="EditBudget" component={EditBudget}  initialParams={{ budget: null }}/>
      <Stack.Screen name="AddBudget" component={AddBudget} />
    </Stack.Navigator>
  );
};
