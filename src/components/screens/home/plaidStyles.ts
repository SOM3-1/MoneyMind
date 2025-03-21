
import { getFontSize } from "@helpers/dynamic";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { theme } from "src/utils/theme";

// Get initial dimensions
const { width: initialWidth, height: initialHeight } = Dimensions.get('window');
const isInitiallyLandscape = initialWidth > initialHeight;

export const plaidStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16
    },
    subContainer:{
        position: 'relative',
        paddingBottom: 20 // Add padding at bottom to ensure content is visible
    },
    closeButton:{
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 10
    },
    box:{
        position: 'relative', // Changed from absolute to improve layout in different orientations
        top: 30,
        width: '100%',
        display: 'flex',
        // gap: '25%'
    },
    image:{
        marginHorizontal: 'auto',
        width: '100%',
        alignSelf: 'center',
        height: Platform.OS === 'ios' ? 180 : 150, // Fixed height for better control
    },
    title:{
        marginTop: 15,
        textAlign: 'center',
        fontSize: getFontSize(16),
        fontFamily: "Montserrat-Regular",
        lineHeight: 25.6,
        color: theme.colors.darkText,
        marginBottom: 20,
        paddingHorizontal: '3%'
    },
    featureContainer: {
        marginVertical: 10,
        marginHorizontal: 14,
        paddingHorizontal: 24,
        paddingVertical: 20,
        display: 'flex',
        gap: 20,
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderStyle: 'solid',
        borderRadius: 12
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    featureIcon: {
        marginRight: 12,
        marginTop: 2
    },
    featureTextContainer: {
        flex: 1
    },
    featureTitle: {
        fontSize: getFontSize(16),
        fontFamily: "Montserrat-bold",
        color: theme.colors.darkText,
        marginBottom: 4,
    },
    featureDescription: {
        fontFamily: "Montserrat-Regular",
        fontSize: getFontSize(14),
        color: theme.colors.darkText,
        lineHeight: 18
    },
    footerContainer:{
        borderTopWidth: 2,
        borderTopColor: theme.colors.border,
        paddingTop: 10,
        marginTop: 10 // Add margin to separate from content above
    },
    footerText: {
        fontSize: getFontSize(14),
        color: theme.colors.subtitle,
        fontFamily: "Montserrat",
        lineHeight: 18,
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 24
    },
    linkText: {
        textDecorationLine: 'underline',
        color: theme.colors.subtitle
    },
    continueButton: {
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 10 // Add margin at bottom for better spacing
    },
    continueButtonText: {
        color: theme.colors.white,
        textAlign: 'center',
        fontFamily: "Montserrat-bold",
        fontSize: getFontSize(14),
    },
    disabledButton: {
        backgroundColor: '#B0BEC5', // Light gray to indicate disabled state
        opacity: 0.6, // Reduce opacity for a "disabled" effect
    },
})