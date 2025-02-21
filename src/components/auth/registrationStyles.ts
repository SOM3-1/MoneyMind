import { DimensionValue, StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

const globalWidth: DimensionValue = '85%'

export const registrationStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        alignContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: theme.colors.background
    },
    inputContainer: {
        gap: 8,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.black
    },
    button: {
        backgroundColor: theme.colors.active,
        borderRadius: 100,
        alignItems: 'center',
        height: 50,
        width: 'auto',
        justifyContent: 'center'
    },
    disabledButton: {
        backgroundColor: theme.colors.disabled,
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        lineHeight: 26,
        fontSize: 19,
        color: theme.colors.white
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    errorBorder: {
        borderBottomColor: 'red',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#000',
    },
    footerLink: {
        fontSize: 16,
        color: theme.colors.primary,
        textDecorationLine: 'underline',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    linkText: {
        color: theme.colors.link,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 19.6,
        fontSize: 14
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        lineHeight: 26,
        fontSize: 19,
        color: theme.colors.black,
        textAlign: 'center'
    },
    connectingText: {
        color: theme.colors.black,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 19.6,
        fontSize: 14,
        textAlign: 'center'
    },
    hyperLinkContainer: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    flexRight: {
        alignSelf: 'flex-end',
    },
    firstSection:{
        flex: 1.5,
    }, secondSection:{
        flex: 2,
         width:globalWidth 

    }, thirdSection:{
        flex: 1,
        width:globalWidth ,
        gap: 15
    },
    loggedInContainer:{
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    },
    recoveryInstructions:{
        fontFamily: 'Montserrat-Regular',
        fontSize:16,
        lineHeight: 25.6,
        textAlign: 'justify'
    }
});
