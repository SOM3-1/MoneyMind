import { getFontSize } from "@helpers/dynamic";
import { DimensionValue, StyleSheet, PixelRatio } from "react-native";
import { theme } from "src/utils/theme";
const scale = PixelRatio.get();

const globalWidth: DimensionValue = "85%";

export const registrationStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    alignContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: getFontSize(24),
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: theme.colors.background,
  },
  inputContainer: {
    gap: 18,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: getFontSize(16),
    color: theme.colors.black,
  },
  button: {
    backgroundColor: theme.colors.active,
    borderRadius: 100,
    alignItems: "center",
    height: 50,
    width: "auto",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    lineHeight: 26,
    fontSize: getFontSize(19),
    color: theme.colors.white,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  errorBorder: {
    borderBottomColor: "red",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  footerText: {
    fontSize: getFontSize(16),
    color: "#000",
  },
  footerLink: {
    fontSize: getFontSize(16),
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    color: theme.colors.link,
    fontFamily: "Montserrat-Regular",
    lineHeight: 19.6,
    fontSize: getFontSize(14),
  },
  title: {
    fontFamily: "Montserrat-Bold",
    lineHeight: 26,
    fontSize: getFontSize(19),
    color: theme.colors.black,
    textAlign: "center",
  },
  connectingText: {
    color: theme.colors.black,
    fontFamily: "Montserrat-Regular",
    lineHeight: 19.6,
    fontSize: getFontSize(14),
    textAlign: "center",
  },
  hyperLinkContainer: {
    justifyContent: "center",
    textAlign: "center",
  },
  flexRight: {
    alignSelf: "flex-end",
  },
  firstSection: {
    height: scale*110,
    justifyContent:'center'
  },
  secondSection: {
    height: 350,
    width: globalWidth,
  },
  thirdSection: {
    width: globalWidth,
    gap: 15,
    height: scale*30,
    justifyContent:'center',
    marginBottom: 100
  },
  loggedInContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
  },
  recoveryInstructions: {
    fontFamily: "Montserrat-Regular",
    fontSize: getFontSize(16),
    lineHeight: 25.6,
    textAlign: "justify",
    color: theme.colors.shadesOfGray
  },
  headerSeparator: {
    gap: 25,
  },
});
