import 'react-native-gesture-handler';
import { MenuWrapperComponent } from '@components/navigation/bottomMenu/MenuWrapper';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Provider} from 'react-redux';
import {appStore, persistor} from './src/store/appStore';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import {PersistGate} from 'redux-persist/integration/react';
import { theme } from 'src/utils/theme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
        <MenuWrapperComponent/>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
