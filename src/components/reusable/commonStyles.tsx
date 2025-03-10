import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const commonStyles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    header: {
        fontSize: 19,
        lineHeight: 26.6,
        fontFamily: 'Montserrat-Bold',
        color: theme.colors.darkText,
    },
    label: {
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        color: theme.colors.subtitle,
        marginBottom: 5,
    },
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
    },
    dropdownContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    dropdownText: {
        fontSize: 16,
        color: theme.colors.darkText,
        fontFamily: theme.fonts.regular,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
    },
    dateInput: {
        flex: 1,
    },
    calendarIcon: {
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: theme.colors.active,
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: "red",
        marginTop: 10,
    },
    errorText: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    dropdown: {
        backgroundColor: theme.colors.white,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownMenu: {
        backgroundColor: theme.colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        fontFamily: theme.fonts.regular
    },
    dropdownContainer: {
        marginBottom: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: theme.colors.white,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        width: '100%',
        height: 50,
        alignSelf:'center',
    },
    button: {
        backgroundColor: theme.colors.active,
        borderRadius: 100,
        alignItems: "center",
        height: 50,
        width: "100%",
        justifyContent: "center",
    },
});