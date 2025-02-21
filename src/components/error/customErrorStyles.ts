import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const customErrorStyles = StyleSheet.create({
    screen: {
        flex:1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems:'center'
    },
    content: {
        justifyContent: 'center',
        alignItems:'center',
        width: 280,
        gap: 10
    },
    header: {
        fontSize: 23,
        fontWeight: 500,
        fontFamily:'Montserrat-Bold',
        textAlign: 'center',
        lineHeight: 32,
        color: theme.colors.black
    },
    body: {
        fontSize: 18,
        fontFamily:'Montserrat-Regular',
        textAlign: 'center',
        lineHeight: 27,
        color: theme.colors.black
    }
})