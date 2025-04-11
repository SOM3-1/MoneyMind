import { DimensionValue, StyleSheet } from "react-native";
import { theme } from "src/utils/theme";


export const accountScreenNavigatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10, 
    paddingTop: 30,
  },
  menuTitle: {
    fontSize: 23,
    fontFamily: "Montserrat-Bold",
    lineHeight: 32.2,
    color: theme.colors.darkText
    
  },
  menuSubtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    lineHeight: 25.6,
    textAlign: "justify",
    color: theme.colors.darkText
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    lineHeight: 22.4,
    color: theme.colors.darkText
  },
  subTitle:{
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    lineHeight: 19.6,
    color: theme.colors.darkText
  },
  headerContainer:{
    paddingHorizontal: 20,
  }
});
