import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const offlineOverlayStyles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        paddingHorizontal: 20,
    },
    image: {
        width: 350,
        height: 250,
        marginBottom: 20,
    },
})