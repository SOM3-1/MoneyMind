import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const aiScreenStyles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontFamily: theme.fonts.bold,
    lineHeight: 32.2,
    color: theme.colors.darkText,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    lineHeight: 25.6,
    color: theme.colors.darkText,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    width: "90%",
    alignContent: "center",
    flex: 1,
    alignSelf: "center",
    marginTop: 30,
    gap: 30,
  },
  days: {
    fontFamily: theme.fonts.regular,
    flex: 1,
    fontSize: 12,
    color: theme.colors.secondarySearch,
  },
  infoContainer: {
    gap: 6,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 20,
    paddingBottom: 100,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    lineHeight: 19.6,
    color: theme.colors.white,
  },
  cardSubTitle: {
    fontFamily: "Montserrat-Bold",
    lineHeight: 26.6,
    fontSize: 19,
    color: theme.colors.white,
  },
  dataContainer: {
    marginTop: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    marginBottom: 10,
    height: 94,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    alignSelf: "flex-start",
    height: 94,
  },
  cardAmount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
  cardSubAmount: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  savingsCard: {
    backgroundColor: "rgba(135, 178, 213, 0.1)",
    borderRadius: 7,
    marginBottom: 10,
    height: 90,
    shadowColor: "transparent",
    borderWidth: 0.2,
    borderColor: theme.colors.subtitle
  },
  savingsAmount: {
    fontFamily: theme.fonts.bold,
    lineHeight: 26.6,
    fontSize: 18,
    color: theme.colors.primary,
  },
  divider: {
    marginVertical: 8,
  },
  spendingTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
