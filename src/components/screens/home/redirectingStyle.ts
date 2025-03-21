import { getFontSize } from "@helpers/dynamic";
import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const redirectingStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    box: {
        marginHorizontal: 48,
        gap: 12
    },
    boxLandscape: {
        alignItems: 'center',
        paddingHorizontal: 24
    },
    gifStyle: {
        width: 315,
        height: 181,
        opacity: 0.5
    },
    gifStyleLandscape: {
        width: 220,
        height: 126,
        marginRight: 16
    },
    text: {
        textAlign: 'center',
        fontSize: getFontSize(16),
        fontFamily: 'Montserrat-Regular',
        color: theme.colors.subtitle,
        lineHeight: 22.4,
    },
});