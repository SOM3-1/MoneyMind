import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BudgetScreenNavigator } from '@components/screens/budget/BudgetScreenNavigator';
import { AIAnalyticsScreenNavigator } from '@components/screens/ai/AIAnalyticsScreenNavigator';
import { AccountScreenNavigator } from '@components/screens/account/AccountScreenNavigator';
import { HomeScreenNavigator } from '@components/screens/home/HomeScreenNavigator';
import { menuStyles } from './menuStyles';
import { theme } from 'src/utils/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreenNavigator"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: menuStyles.menuContainer, 
        tabBarLabelStyle: menuStyles.menuLabel, 
        tabBarActiveBackgroundColor: theme.colors.primary,
        tabBarActiveTintColor: 'white',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'HomeScreenNavigator':
              iconName = focused ? 'home-filled' : 'home';
              break;
            case 'BudgetScreenNavigator':
              iconName = focused ? 'attach-money' : 'attach-money';
              break;
            case 'AIAnalyticsScreenNavigator':
              iconName = focused ? 'auto-awesome' : 'auto-awesome';
              break;
            case 'AccountScreenNavigator':
              iconName = focused ? 'person' : 'person';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={28} color={'white'} />;
        },
      })}
    >
      <Tab.Screen name="HomeScreenNavigator" component={HomeScreenNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="BudgetScreenNavigator" component={BudgetScreenNavigator} options={{ title: 'Budget' }} />
      <Tab.Screen name="AIAnalyticsScreenNavigator" component={AIAnalyticsScreenNavigator} options={{ title: 'AI Analytics' }} />
      <Tab.Screen name="AccountScreenNavigator" component={AccountScreenNavigator} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
};
