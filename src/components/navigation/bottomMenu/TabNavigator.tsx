import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BudgetScreenNavigator } from '@components/screens/budget/BudgetScreenNavigator';
import { AIAnalyticsScreenNavigator } from '@components/screens/ai/AIAnalyticsScreenNavigator';
import { AccountScreenNavigator } from '@components/screens/account/AccountScreenNavigator';
import { HomeScreenNavigator } from '@components/screens/home/HomeScreenNavigator';
import { theme } from 'src/utils/theme';
import HomeOutline from './../../../assets/icons/home-outline.svg';
import HomeFilled from './../../../assets/icons/home-filled.svg';
import BudgetOutline from "./../../../assets/icons/budget-outline.svg"
import BudgetFilled from './../../../assets/icons/budget-filled.svg';
import AIOutline from './../../../assets/icons/ai-outline.svg';
import AIFilled from './../../../assets/icons/ai-filled.svg';
import AccountOutline from './../../../assets/icons/account-outline.svg';
import AccountFilled from './../../../assets/icons/account-filled.svg';
import useMenuStyles from './usemenuStyles';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const menuStyles = useMenuStyles();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreenNavigator"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: menuStyles.menuContainer, 
        tabBarLabelStyle: menuStyles.menuLabel, 
        tabBarActiveBackgroundColor: theme.colors.primary,
        tabBarActiveTintColor: 'white',
        tabBarLabelPosition: 'below-icon',
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          switch (route.name) {
            case 'HomeScreenNavigator':
              IconComponent = focused ? HomeFilled : HomeOutline;
              break;
            case 'BudgetScreenNavigator':
              IconComponent = focused ? BudgetFilled : BudgetOutline;
              break;
            case 'AIAnalyticsScreenNavigator':
              IconComponent = focused ? AIFilled : AIOutline;
              break;
            case 'AccountScreenNavigator':
              IconComponent = focused ? AccountFilled : AccountOutline;
              break;
            default:
              IconComponent = HomeOutline;
          }
          return <IconComponent width={28} height={28} style={{marginTop: 10 }}/>;
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
