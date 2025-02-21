import { StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { theme } from 'src/utils/theme';


const bottomPadding = initialWindowMetrics?.insets?.bottom
  ? initialWindowMetrics.insets.bottom / 3
  : 0;

export const menuStyles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    height: 71,
    paddingBottom: bottomPadding + 20,
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
    marginTop: 8
  },
});
