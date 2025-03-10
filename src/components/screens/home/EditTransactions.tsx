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
import { ScreenType } from "@ourtypes/ScreenType";
import { commonStyles } from "@components/reusable/commonStyles";

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
        } finally {
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
        } finally {
            setIsProcessing(false);
        }
    };

    if (!transaction) {
        return <Text style={commonStyles.errorText}>Transaction data is missing. Please try again.</Text>;
    }

    return (
        <View style={commonStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', }}>
                    <MaterialIcons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                    <Text style={commonStyles.header}>Edit Expense</Text></View>
                <TouchableOpacity onPress={() => { setDeleteDialogVisible(true) }}>
                    <MaterialIcons name="delete-outline" size={24} color={theme.colors.subtitle} />
                </TouchableOpacity>
            </View>
            <View style={{ gap: 30, marginTop: 40 }}><CustomTextInput label="Amount" value={`$ ${transaction.amount.toFixed(2)}`} editable={false} />

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
                    menuContentStyle={commonStyles.dropdownMenu}
                    hideMenuHeader={true}
                />
                <CustomTextInput label="Date" value={formattedDate} editable={false}
                    rightIcon={
                        <MaterialIcons
                            name="calendar-today"
                            size={20}
                            color={theme.colors.subtitle}
                        />
                    }
                /></View>

            <View style={commonStyles.buttonContainer}>
                <TouchableOpacity onPress={handleSave} style={commonStyles.button}>
                    <View>
                        <Text style={registrationStyles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ConfirmDeleteDialog
                visible={deleteDialogVisible}
                onDismiss={() => setDeleteDialogVisible(false)}
                onConfirm={handleDelete}
                type={ScreenType.TRANSACTIONS}
            />
            {isProcessing && <CustomActivityIndicator />}
        </View>
    );
};

export default EditTransactions
