import React, { useEffect, useState } from 'react';
import {Platform, TextInput, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  LinkExit,
  LinkEvent,
  LinkLogLevel,
  LinkSuccess,
  dismissLink,
  LinkOpenProps,
  usePlaidEmitter,
  LinkIOSPresentationStyle,
  LinkTokenConfiguration,
  FinanceKitError,
  create,
  open,
  syncFinanceKit,
  submit,
  SubmissionData,
} from 'react-native-plaid-link-sdk';

function isValidString(str: string): boolean {
  if (str && str.trim() !== '') {
    return true;
  }
  return false;
}

function createLinkTokenConfiguration(
  token: string,
  noLoadingState: boolean = false,
): LinkTokenConfiguration {
  console.log(`token: ${token}`);
  return {
    token: token,
    // Hides native activity indicator if true.
    noLoadingState: noLoadingState,
  };
}

function createSubmissionData(phoneNumber: string): SubmissionData {
  return {
    phoneNumber: phoneNumber,
  };
}

function createLinkOpenProps(): LinkOpenProps {
  return {
    onSuccess: (success: LinkSuccess) => {
      // User was able to successfully link their account.
      console.log('Success: ', success);
      success.metadata.accounts.forEach(it => console.log('accounts', it));
    },
    onExit: (linkExit: LinkExit) => {
      // User exited Link session. There may or may not be an error depending on what occured.
      console.log('Exit: ', linkExit);
      dismissLink();
    },
    // MODAL or FULL_SCREEEN presentation on iOS. Defaults to MODAL.
    iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
    logLevel: LinkLogLevel.ERROR,
  };
}

export const HomeCardName: React.FC = () => {
  // Render using the link_token integration. Refer to the docs
  // https://plaid.com/docs/#create-link-token on how to create
  // a new link_token.

  // Use event emitter to get real time events during a Link Session.
  usePlaidEmitter((event: LinkEvent) => {
    // Log Link Session events to console.
    console.log(event);
  });

  const [text, onChangeText] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [ready, setReady] = useState(false);
  const [linkToken, setLinkToken] = useState('');
  const navigation = useNavigation();

  const iOSVersionParts = String(Platform.Version).split('.');
  const [majorVersion, minorVersion] =
    iOSVersionParts.length >= 2 ? iOSVersionParts : [null, null];

  const financeKitText = () => {
    if (majorVersion && minorVersion) {
      const majorInt = parseInt(majorVersion, 10);
      const minorInt = parseInt(minorVersion, 10);

      if (majorInt > 17) {
        return <Text style={styles.button}>Sync FinanceKit</Text>;
      } else if (majorInt === 17 && minorInt >= 4) {
        return <Text style={styles.button}>Sync FinanceKit</Text>;
      } else {
        return (
          <Text style={styles.button}>
            FinanceKit not supported on this version of iOS
          </Text>
        );
      }
    } else {
      // Fallback return if majorVersion or minorVersion are not provided.
      return <Text style={styles.button}>Invalid iOS version</Text>;
    }
  };

  useEffect(() => {
    // Handle deep linking when app opens from Plaid
    const handleDeepLink = ({ url }: { url: string }) => {
      console.log('Deep link URL:', url);
      // Parse the URL and handle the return data
      // You might want to navigate to a success screen or update the UI
    };

    // Add deep link listener when component mounts
    Linking.addEventListener('url', handleDeepLink);

    // Initialize Plaid
    const fetchLinkToken = async () => {
      try {
        const token = 'link-sandbox-2b40861b-e6fd-419d-be34-daca9130632b';
        setLinkToken(token);
        
        const tokenConfig: LinkTokenConfiguration = {
          token: token,
          noLoadingState: false,
        };
        
        create(tokenConfig);
        setReady(true);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    
    fetchLinkToken();

    // Clean up listener when component unmounts
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const openPlaidLink = () => {
    if (!ready) return;
    
    const openProps: LinkOpenProps = {
      onSuccess: (success: LinkSuccess) => {
        console.log('Success:', success);
        // Handle success and return to app
        success.metadata.accounts.forEach(it => console.log('accounts', it));
        // You can navigate to a success screen here
        navigation.navigate('Success');
      },
      onExit: (exit: LinkExit) => {
        console.log('Exit:', exit);
        dismissLink();
        // Handle exit and return to app
        if (exit.error) {
          // Handle error case
          navigation.navigate('Error');
        } else {
          // Handle normal exit
          navigation.navigate('Home');
        }
      },
      iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
      logLevel: LinkLogLevel.ERROR
    };
    
    open(openProps);
  };

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="link-sandbox-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        placeholderTextColor={'#D3D3D3'}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (isValidString(text)) {
            const tokenConfiguration = createLinkTokenConfiguration(text);
            create(tokenConfiguration);
            setDisabled(false);
          }
        }}>
        <Text style={styles.button}>Create Link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabled}
        style={disabled ? styles.disabledButton : styles.button}
        onPress={() => {
          const submissionData = createSubmissionData('415-555-0015');
          submit(submissionData);
        }}>
        <Text style={styles.button}>Submit Layer Phone Number</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabled}
        style={disabled ? styles.disabledButton : styles.button}
        onPress={openPlaidLink}>
        <Text style={styles.button}>Open Link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const completionHandler = (error?: FinanceKitError) => {
            if (error) {
              console.error('Error:', error);
            } else {
              console.log('Sync completed successfully');
            }
          };
          const requestAuthorizationIfNeeded = true;
          syncFinanceKit(text, requestAuthorizationIfNeeded, completionHandler);
        }}>
        {financeKitText()}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: '#2196F3',
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 4,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  disabledButton: {
    elevation: 8,
    backgroundColor: '#2196F3',
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 4,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
    opacity: 0.5,
  },
  input: {
    height: 40,
    margin: 12,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 10,
  },
  embedded: {
    width: '95%',
    alignSelf: 'center',
    height: 360,
  },
});
