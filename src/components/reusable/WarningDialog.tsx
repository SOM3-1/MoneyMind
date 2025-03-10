import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Dialog, Portal, Button, Text } from "react-native-paper";
import { theme } from "src/utils/theme";

interface WarningDialogProps {
    visible: boolean;
    onDismiss: () => void;
    message: string;
}

export const WarningDialog: React.FC<WarningDialogProps> = ({ visible, onDismiss, message }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
                <Dialog.Title style={styles.title}>Warning</Dialog.Title>
                <Dialog.Content>
                    <Text style={styles.message}>{message}</Text>
                </Dialog.Content>
                <Dialog.Actions style={styles.actions}>
                    <Button onPress={onDismiss} labelStyle={styles.cancel}>Close</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 10,
        backgroundColor: theme.colors.background,
        paddingBottom: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        lineHeight: 22.4,
        color: theme.colors.black
    },
    message: {
        fontFamily: "Montserrat-Regular",
        fontSize: 16,
        lineHeight: 25.6,
        textAlign: "justify",
        color: theme.colors.darkText
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end", 
        width: "100%",
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    deleteButton: {
        backgroundColor: theme.colors.active,
        borderRadius: 100,
        width: 153,
        height: 42,
        alignItems:'center',
        justifyContent:'center'
    },
    cancel:{
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        lineHeight: 22.4,
        color: theme.colors.darkText
    },
    confirm:{
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        lineHeight: 22.4,
        color: theme.colors.white
    }
});

export default WarningDialog;
