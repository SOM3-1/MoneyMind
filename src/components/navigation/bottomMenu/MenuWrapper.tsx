import React, { useRef } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import useMenuStyles from './usemenuStyles';
import { TabNavigator } from './TabNavigator';
import { UserSelection } from '@components/auth/UserSelection';
import { AppState } from '@ourtypes/AppState';

export const MenuWrapperComponent = () => {
  const styles = useMenuStyles();

  const isLoggedIn = useSelector((state: AppState) => state.isLoggedIn);
  const navigationRef =
    useRef<ReturnType<typeof NavigationContainer.prototype.ref>>();
  const routeNameRef = useRef<string | undefined>();
 

  const stateChange = async () => {
    const previousRouteName = routeNameRef?.current;
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
    if ((previousRouteName && currentRouteName) && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  };

  return (
    <View style={styles.safeArea}>
      <NavigationContainer ref={navigationRef}
        onStateChange={stateChange}>
        {isLoggedIn ? <TabNavigator /> : <UserSelection />}
      </NavigationContainer>
    </View>
  );
};