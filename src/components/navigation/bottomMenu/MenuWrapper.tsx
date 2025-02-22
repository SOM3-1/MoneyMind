import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import useMenuStyles from './usemenuStyles';
import { TabNavigator } from './TabNavigator';
import { UserSelection } from '@components/auth/UserSelection';
import { AppState } from '@ourtypes/AppState';
import NetInfo from '@react-native-community/netinfo';
import {OfflineOverlay} from '@components/noNetInfo/OfflineOverlay';
export const MenuWrapperComponent = () => {
  const styles = useMenuStyles();

  const isLoggedIn = useSelector((state: AppState) => state.isLoggedIn);
  const navigationRef =
    useRef<ReturnType<typeof NavigationContainer.prototype.ref>>();
  const routeNameRef = useRef<string | undefined>();
 
  const [isOffline, setIsOffline] = useState(false);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);
  
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
      {isOffline && <OfflineOverlay />} 
    </View>
  );
};