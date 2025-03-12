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
        marginTop: 30,
        gap: 30
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
        alignContent: 'center',
        flex: 1,
        alignSelf:'center',
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    image: {
        width: 185,
        height: 181.12,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    fab: {
        width: 70,
        height: 70,
        position: 'absolute',
        backgroundColor: theme.colors.active,
        bottom: 30,
        right: 30,
        borderRadius: '50%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    fabIcon: {
        textAlign: "center",
        transform: [{ rotate: "135 deg" }]
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        lineHeight: 22.4,
        color: theme.colors.darkText,
        textAlign: 'left'
    },
    transactionItem: {
        width: '100%',
        height: 124,
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: theme.colors.subtitle,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
        gap: 10
    },
    transactionsContainer: {
        gap: 20
    },
    dateContainer: {
        width: 'auto',
        alignItems: "center",
        marginRight: 10,
    },
    dateMonth: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        lineHeight: 22.4,
        color: theme.colors.subtitle
    },
    dateDay: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        lineHeight: 22.4,
        color: theme.colors.subtitle
    },
    transactionDetails: {
        flex: 1,
        gap: 10,
    },
    transactionTitle: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        lineHeight: 22.4,
        color: theme.colors.darkText,
        flexShrink: 1,
    },
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 10
    },
    categoryIcon: {
        marginRight: 6,
    },
    categoryText: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        lineHeight: 25.6,
        color: theme.colors.darkText,
    },
    amountContainer: {
        alignItems: "flex-end",
        justifyContent: 'space-between'
    },
    amountText: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        color: theme.colors.price,
        lineHeight:26.6
    },
    noTransactions: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
    }
})
