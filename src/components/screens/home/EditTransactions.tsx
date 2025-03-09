import React, { useState } from "react";
import { View, Alert, StyleSheet, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { useNavigation, useRoute, RouteProp, ParamListBase } from "@react-navigation/native";
import { Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { updateTransaction, deleteTransaction } from "@services/transactionService";
import CustomTextInput from "@components/reusable/CustomTextInput";
import { Transaction } from "@ourtypes/Transaction";
import { CATEGORY_OPTIONS, CategoryType } from "@ourtypes/Category";
import { DateTime } from "luxon";
import { Dropdown } from "react-native-paper-dropdown";
import { theme } from "src/utils/theme";
import ConfirmDeleteDialog from "@components/reusable/ConfirmDeleteDialog";
import { registrationStyles } from "@components/auth/registrationStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { CustomActivityIndicator } from "@components/reusable/CustomActivityIndicator";

type EditTransactionRouteProp = RouteProp<{ EditTransactions: { transaction?: Transaction } }, "EditTransactions">;

export const EditTransactions: React.FC = () => {
    const route = useRoute<EditTransactionRouteProp>();
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const transaction = route.params.transaction;
    const transactionId = transaction?.id || "";
    const formattedDate = DateTime.fromISO(transaction?.date || '').toFormat("MM/dd/yyyy");
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)

    const [category, setCategory] = useState<CategoryType>(transaction?.category as CategoryType || "Other");

    const showToast = (message: string) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    const handleSave = async () => {
        setIsProcessing(true);
        if (!transaction) {
            showToast("Transaction data is missing.");
            return;
        }

        try {
            await updateTransaction(transactionId, { category });
            showToast("Transaction updated successfully.");
            navigation.goBack();
        } catch (error) {
            console.error("Failed to update transaction:", error);
            showToast("Failed to update transaction.");
        }finally {
            setIsProcessing(false); 
        }
    };

    const handleDelete = async () => {
        setDeleteDialogVisible(false)
        setIsProcessing(true);
        if (!transaction) {
            showToast("Transaction data is missing.");
            return;
        }
        try {
            await deleteTransaction(transactionId);
            showToast("Transaction deleted successfully.");
            navigation.goBack();
        } catch (error) {
            console.error("Failed to delete transaction:", error);
            showToast("Failed to delete transaction.");
        }finally {
            setIsProcessing(false);
        }
    };

    if (!transaction) {
        return <Text style={styles.errorText}>Transaction data is missing. Please try again.</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', }}>
                    <MaterialIcons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.header}>Edit Expense</Text></View>
                <TouchableOpacity onPress={() => { setDeleteDialogVisible(true) }}>
                    <MaterialIcons name="delete-outline" size={24} color={theme.colors.subtitle} />
                </TouchableOpacity>
            </View>
            <View style={{gap: 30, marginTop: 40}}><CustomTextInput label="Amount" value={`$ ${transaction.amount.toFixed(2)}`} editable={false} />

                <CustomTextInput label="Description" value={transaction.description} editable={false} />

                <Dropdown
                    label="Category"
                    mode="outlined"
                    value={category}
                    onSelect={(value) => setCategory(value as CategoryType)}
                    options={CATEGORY_OPTIONS}
                    placeholder="Select Category"
                    error={false}
                    disabled={false}
                    menuContentStyle={styles.dropdownMenu}
                />
                <CustomTextInput label="Date" value={formattedDate} editable={false} /></View>


            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableWithoutFeedback onPress={handleSave}>
                        <View>
                            <Text style={registrationStyles.buttonText}>Save</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <ConfirmDeleteDialog
                visible={deleteDialogVisible}
                onDismiss={() => setDeleteDialogVisible(false)}
                onConfirm={handleDelete}
            />
            {isProcessing && <CustomActivityIndicator />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    label: {
        fontSize: 14,
        color: "gray",
        marginBottom: 5,
    },
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
    },
    dropdownContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    dropdownText: {
        fontSize: 16,
        color: "black",
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
    },
    dateInput: {
        flex: 1,
    },
    calendarIcon: {
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: theme.colors.active,
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: "red",
        marginTop: 10,
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    dropdown: {
        backgroundColor: theme.colors.white,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownMenu: {
        backgroundColor: theme.colors.background,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdownContainer: {
        marginBottom: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: theme.colors.background,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        left: 20,
        right: 20,
        width: '100%',
        height: 50,
    },
    button: {
        backgroundColor: theme.colors.active,
        borderRadius: 100,
        alignItems: "center",
        height: 50,
        width: "100%",
        justifyContent: "center",
    },
});

export default EditTransactions
