import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import { Text, View } from "react-native"
import { Home } from "./Home";
import { RedirectingScreen } from "./RedirectingScreen";
import { PlaidScreen } from "./PlaidScreen";
import { Easing } from 'react-native';

const Stack = createStackNavigator();

export const HomeScreenNavigator: React.FC = () => {

    return (
            <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                transitionSpec: {
                  open: {
                    animation: 'timing',
                    config: {
                      duration: 300, 
                      easing: Easing.bezier(0.36, 0, 0.66, -0.56), 
                    },
                  },
                  close: {
                    animation: 'timing',
                    config: {
                      duration: 300,
                      easing: Easing.bezier(0.36, 0, 0.66, -0.56),
                    },
                  },
                },
                cardStyleInterpolator: ({ current }) => ({
                  cardStyle: {
                    opacity: current.progress,
                    transform: [
                      {
                        translateY: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  },
                }),
              }}
        
            >
                <Stack.Screen name="Home" component={Home}  />
                <Stack.Screen name="RedirectingScreen" component={RedirectingScreen}  />
                <Stack.Screen name="PlaidScreen" component={PlaidScreen} />
            </Stack.Navigator>
    );
};

