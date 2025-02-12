import { StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { theme } from 'src/utils/theme';


const bottomPadding = initialWindowMetrics?.insets?.bottom
  ? initialWindowMetrics.insets.bottom / 3
  : 0;

export const menuStyles = StyleSheet.create({
  menuContainer: {
    borderTopColor: theme.colors.primary,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 71,
    justifyContent: 'space-around',
    paddingBottom: bottomPadding,
    backgroundColor: theme.colors.primary,
    right: 0,
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
    marginTop: 4
  },
});
