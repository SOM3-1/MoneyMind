import { StyleSheet } from "react-native"
import { theme } from "src/utils/theme"
export const homeScreenStyles = StyleSheet.create({
    userName: {
        fontSize: 23,
        fontFamily: 'Montserrat-Bold',
        lineHeight: 32.2,
        color: theme.colors.black
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 25.6,
        color: theme.colors.black
    },
    homeConatiner: {
        width: '90%',
        alignContent: 'center',
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    body: {
        width: 315,
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        lineHeight: 22.4,
        color: theme.colors.subtitle,
    },
    emptyTransactionsContainer: {
        justifyContent: 'center',
        height: 237,
        width: 315,
        alignContent:'center',
        flex:1
    },
    container:{
        flex:1,
        backgroundColor: 'white'
    },
    image: {
        width: 185,
        height: 181.12,
        marginBottom: 20,
        justifyContent:'center',
        alignSelf:'center',
        color: 'red'
    },
    fab:{
        width: 70,
        height: 70,
        position: 'absolute',
        backgroundColor :theme.colors.active,
        bottom: 30,
        right: 30,
        borderRadius: '50%',
        alignContent:'center',
        justifyContent:'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    fabIcon: {
        textAlign: "center", 
        transform: [{rotate: "135 deg"}]
    }
})
