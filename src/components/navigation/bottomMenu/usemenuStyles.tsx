import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from 'src/utils/theme';

const getBackgroundColor = (colorScheme: string | null | undefined) => {
  return colorScheme === 'dark' ? Colors.darker : Colors.lighter;
};

const useMenuStyles = () => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: getBackgroundColor(colorScheme),
      flex: 1,
    },
    menuContainer: {
      flexDirection: 'row',
      height: 71 + insets.bottom,
      paddingBottom: insets.bottom > 0 ? insets.bottom / 2 : 10,
      backgroundColor: theme.colors.primary,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
    },
    menuLabel: {
      color: theme.colors.white, 
      fontFamily: 'Montserrat-Bold',
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 8,
    },
  });

  return styles;
};

export default useMenuStyles;