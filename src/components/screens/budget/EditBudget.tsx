import React, { useState } from "react";
import {
    View,
    ToastAndroid,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute, RouteProp, ParamListBase } from "@react-navigation/native";
import { Text } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { updateBudget, deleteBudget } from "@services/budgetService";
import CustomTextInput from "@components/reusable/CustomTextInput";
import { Budget } from "@ourtypes/Budget";
import { DateTime } from "luxon";
import ConfirmDeleteDialog from "@components/reusable/ConfirmDeleteDialog";
import { registrationStyles } from "@components/auth/registrationStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { CustomActivityIndicator } from "@components/reusable/CustomActivityIndicator";
import { theme } from "src/utils/theme";
import { ScreenType } from "@ourtypes/ScreenType";
import { commonStyles } from "@components/reusable/commonStyles";

type EditBudgetRouteProp = RouteProp<{ EditBudget: { budget?: Budget } }, "EditBudget">;

export const EditBudget: React.FC = () => {
    const route = useRoute<EditBudgetRouteProp>();
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const budget = route.params.budget;
    const budgetId = budget?.id || "";

    // Date states
    const [fromDate, setFromDate] = useState(budget?.fromDate ? new Date(budget.fromDate) : new Date());
    const [toDate, setToDate] = useState(budget?.toDate ? new Date(budget.toDate) : new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [title, setTitle] = useState(budget?.title || "");
    const [amount, setAmount] = useState<number>(budget?.amount ? Number(budget.amount) : 0);

    const showToast = (message: string) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    const handleSave = async () => {
        setIsProcessing(true);
        if (!budget) {
            showToast("Budget data is missing.");
            return;
        }
        const finalAmount = isNaN(amount) ? 0 : amount
        try {
            await updateBudget(budgetId, {
                title,
                amount: finalAmount,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            });
            showToast("Budget updated successfully.");
            navigation.goBack();
        } catch (error) {
            console.error("Failed to update budget:", error);
            showToast("Failed to update budget.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        setDeleteDialogVisible(false);
        setIsProcessing(true);
        if (!budget) {
            showToast("Budget data is missing.");
            return;
        }
        try {
            await deleteBudget(budgetId);
            showToast("Budget deleted successfully.");
            navigation.goBack();
        } catch (error) {
            console.error("Failed to delete budget:", error);
            showToast("Failed to delete budget.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!budget) {
        return <Text style={commonStyles.errorText}>Budget data is missing. Please try again.</Text>;
    }

    return (
        <View style={commonStyles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                    <MaterialIcons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                    <Text style={commonStyles.header}>Edit Budget</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => setDeleteDialogVisible(true)}>
                    <MaterialIcons name="delete-outline" size={24} color={theme.colors.subtitle} />
                </TouchableWithoutFeedback>
            </View>

            <View style={{ gap: 30, marginTop: 40 }}>
                <CustomTextInput label="Title" value={title} onChangeText={setTitle} editable={true} />
                <CustomTextInput label="Amount" value={amount.toString()} onChangeText={(text) => {
                   const numericValue = parseFloat(text.replace(/[^0-9.]/g, '')) || 0; 
                   setAmount(numericValue); 
                }} keyboardType="numeric" />

                <CustomTextInput
                    label="Start Date"
                    value={DateTime.fromJSDate(fromDate).toFormat("MM/dd/yy")}
                    editable={false}
                    rightIcon={
                        <MaterialIcons
                            name="calendar-today"
                            size={20}
                            color={theme.colors.subtitle}
                            onPress={() => setShowFromDatePicker(true)}
                        />
                    }
                />
                <DatePicker
                    modal
                    open={showFromDatePicker}
                    date={fromDate}
                    mode="date"
                    onConfirm={(date) => {
                        setFromDate(date);
                        setShowFromDatePicker(false);
                    }}
                    onCancel={() => setShowFromDatePicker(false)}
                />

                <CustomTextInput
                    label="End Date"
                    value={DateTime.fromJSDate(toDate).toFormat("MM/dd/yy")}
                    editable={false}
                    rightIcon={
                        <MaterialIcons
                            name="calendar-today"
                            size={20}
                            color={theme.colors.subtitle}
                            onPress={() => setShowToDatePicker(true)}
                        />
                    }
                />
                <DatePicker
                    modal
                    open={showToDatePicker}
                    date={toDate}
                    mode="date"
                    onConfirm={(date) => {
                        if (date < fromDate) {
                          showToast("End date cannot be earlier than start date.");
                        } else {
                          setToDate(date);
                        }
                        setShowToDatePicker(false);
                      }}
                    onCancel={() => setShowToDatePicker(false)}
                />
            </View>

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
                type={ScreenType.BUDGET}
            />
            {isProcessing && <CustomActivityIndicator />}
        </View>
    );
};

export default EditBudget;
