
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BudgetScreen from './BudgetScreen';
import AddBudget from './AddBudget';
import { BudgetProvider } from './BudgetContext';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

// Ensure BudgetProvider is not re-created on every render
const BudgetNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
    <Stack.Screen name="AddBudget" component={AddBudget} />
  </Stack.Navigator>
);

const BudgetScreenNavigator: React.FC = () => {
  return (
    <BudgetProvider> 
      <BudgetNavigator />
    </BudgetProvider>
  );
};

export default BudgetScreenNavigator;

