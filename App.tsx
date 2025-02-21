import 'react-native-gesture-handler';
import { MenuWrapperComponent } from '@components/navigation/bottomMenu/MenuWrapper';
import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Provider } from 'react-redux';
import { appStore, persistor } from './src/store/appStore';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from 'src/utils/theme';
import { CustomError } from '@components/error/CustomError';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthListener from '@components/auth/AuthListener';

function App(): React.JSX.Element {
  
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
    flex: 1
  };

  const CustomFallback = (props: { error: Error; resetError: Function }) => (
    <CustomError errorMessage={props.error.message} crashError={props.error} />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={backgroundStyle}>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <Provider store={appStore}>
            <PersistGate loading={null} persistor={persistor}>
              <MenuWrapperComponent />
              <AuthListener/>
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
