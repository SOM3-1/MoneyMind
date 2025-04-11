import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BudgetScreenNavigator } from '@components/screens/budget/BudgetScreenNavigator';
import { AIAnalyticsScreenNavigator } from '@components/screens/ai/AIAnalyticsScreenNavigator';
import { AccountScreenNavigator } from '@components/screens/account/AccountScreenNavigator';
import { HomeScreenNavigator } from '@components/screens/home/HomeScreenNavigator';
import { theme } from 'src/utils/theme';
import HomeOutline from './../../../assets/icons/home-outline.svg';
import HomeFilled from './../../../assets/icons/home-filled.svg';
import BudgetOutline from "./../../../assets/icons/budget-outline.svg";
import BudgetFilled from './../../../assets/icons/budget-filled.svg';
import AIOutline from './../../../assets/icons/ai-outline.svg';
import AIFilled from './../../../assets/icons/ai-filled.svg';
import AccountOutline from './../../../assets/icons/account-outline.svg';
import AccountFilled from './../../../assets/icons/account-filled.svg';
import useMenuStyles from './usemenuStyles';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeContinueScreen } from '@components/screens/home/ContinueHome';
import { HomeCardName } from '@components/screens/home/HomeCardName';
import { EditExpenseScreen } from '@components/screens/home/EditExpenseScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreenNavigator" component={HomeScreenNavigator} />
    <HomeStack.Screen name="ContinueHome" component={HomeContinueScreen} />
    <HomeStack.Screen name="EditExpenseScreen" component={EditExpenseScreen} />
  </HomeStack.Navigator>
);

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
          return <IconComponent width={28} height={28} style={{marginTop: 10 }} />;
        },
      })}
    >
      <Tab.Screen name="HomeScreenNavigator" component={HomeStackScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="BudgetScreenNavigator" component={BudgetScreenNavigator} options={{ title: 'Budget' }} />
      <Tab.Screen name="AIAnalyticsScreenNavigator" component={AIAnalyticsScreenNavigator} options={{ title: 'AI Analytics' }} />
      <Tab.Screen name="AccountScreenNavigator" component={AccountScreenNavigator} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
};
