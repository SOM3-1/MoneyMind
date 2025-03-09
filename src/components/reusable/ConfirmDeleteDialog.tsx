import { ScreenType } from "@ourtypes/ScreenType";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Dialog, Portal, Button, Text } from "react-native-paper";
import { theme } from "src/utils/theme";

interface ConfirmDeleteDialogProps {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    type: ScreenType;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ visible, onDismiss, onConfirm, type }) => {
    const body:string = `Are you sure you want to delete this ${type === ScreenType.TRANSACTIONS ? 'expense' :'budget'}?`
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
                <Dialog.Title style={styles.title}>Confirm Delete?</Dialog.Title>
                <Dialog.Content>
                    <Text style={styles.message}>{body}</Text>
                </Dialog.Content>
                <Dialog.Actions style={styles.actions}>
                    <Button onPress={onDismiss} labelStyle={styles.cancel}>Cancel</Button>
                    <View style={styles.deleteButton}><TouchableWithoutFeedback onPress={onConfirm} ><Text style={styles.confirm}>Yes, Delete</Text></TouchableWithoutFeedback></View>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 10,
        backgroundColor: theme.colors.white,
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
        justifyContent: "space-between", 
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
        color: theme.colors.active
    },
    confirm:{
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        lineHeight: 22.4,
        color: theme.colors.white
    }
});

export default ConfirmDeleteDialog;
