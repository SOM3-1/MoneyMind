import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const getBackgroundColor = (colorScheme: string | null | undefined) => {
  return colorScheme === 'dark' ? Colors.darker : Colors.lighter;
};

const useMenuStyles = () => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: getBackgroundColor(colorScheme),
      flex: 1,
    },
  });

  return styles;
};

export default useMenuStyles;