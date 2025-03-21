import { getFontSize } from "@helpers/dynamic";
import { StyleSheet, Platform } from "react-native";
import { theme } from "src/utils/theme";

export const homeStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 80, // Extra space at bottom for the floating button
    },
    headerContainer: {
        paddingHorizontal: 8,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center'
    },
    title: {
        fontSize: getFontSize(23),
        fontFamily: "Montserrat-Bold",
        lineHeight: 32.2,
        color: theme.colors.darkText,
        marginBottom: 8
    },
    subTitle: {
        fontFamily: "Montserrat-Regular",
        fontSize: getFontSize(16),
        lineHeight: 25.6,
        textAlign: "justify",
        color: theme.colors.darkText
    },
    imgContainer: {
        minHeight: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 20,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center'
    },
    imgContainerLandscape: {
        minHeight: 200,
        paddingHorizontal: 16
    },
    gifStyle: {
        width: 185,
        height: 182,
        opacity: 0.5
    },
    gifStyleLandscape: {
        width: 200,
        height: 182,
        opacity:0.5
    },
    textWrapper: {
        maxWidth: 315
    },
    description: {
        textAlign: 'center',
        fontSize: getFontSize(16),
        fontFamily: 'Montserrat-Regular',
        color: theme.colors.subtitle,
        lineHeight: 22.4,
    },
    addButton: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 20,
        right: 20,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: theme.colors.active,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    }
});

