import { StyleSheet } from "react-native"
import { theme } from "src/utils/theme"
export const budgetScreenStyles = StyleSheet.create({
    fabIcon: {
        textAlign: "center",
    },
    card: {
        backgroundColor: theme.colors.background,
        borderRadius: 7,
        padding: 15,
        marginBottom: 10,
        width: '100%',
        height: 'auto',
        borderWidth: 0.5,
        borderColor: theme.colors.subtitle,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        flex: 1
    },
    title: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        lineHeight: 22.4,
        color: theme.colors.darkText,
        maxWidth: '70%'
    },
    amount: {
        fontSize: 19,
        fontFamily: theme.fonts.bold,
        lineHeight: 26.6,
        color: theme.colors.primary,
        flexShrink: 0,
    },
    dateRange: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        lineHeight: 25.6,
        color: theme.colors.darkText,
        marginBottom: 10,
    },
    progressBarContainer: {
        flexDirection: "row",
        height: 20,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#E0E0E0",
        marginBottom: 10,
    },
    progressSegment: {
        height: "100%",
    },
    categoriesContainer: {
        flexDirection: "column",
        marginVertical: 10,

    },
    categoryItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 5,
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: '50%',
        marginRight: 6,
        textAlign: 'center'
    },
    categoryText: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        lineHeight: 25.6,
        color: theme.colors.darkText,
    },
    editIcon: {
       alignSelf:'flex-end',
        width: 30,
        height: 30
    },
})
