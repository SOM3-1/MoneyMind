import { registrationStyles } from "@components/auth/registrationStyles";
import { AIFinancialAnalysis } from "@ourtypes/Ai";
import React from "react";
import { Alert, Linking, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity } from "react-native";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { theme } from "src/utils/theme";

export const ExportResponse: React.FC<{ data: AIFinancialAnalysis }> = ({
    data,
}) => {

    const requestStoragePermission = async () => {
        if (Platform.OS !== "android") return true;
    
        try {
            let permission =
                Platform.Version >= 33
                    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES 
                    : Platform.Version >= 30
                    ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE 
                    : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE; 
    
            const status = await check(permission);
            if (status === RESULTS.GRANTED) {
                console.log("Storage permission already granted");
                return true;
            }
    
            const result = await request(permission);
    
            if (result === RESULTS.GRANTED) {
                console.log("Storage permission granted");
                return true;
            } else if (result === RESULTS.DENIED) {
                Alert.alert("Permission Required", "Storage permission is required to save files.", [
                    { text: "OK" },
                ]);
            } else if (result === RESULTS.BLOCKED) {
                Alert.alert(
                    "Permission Blocked",
                    "You have permanently denied storage permission. Please enable it in settings.",
                    [{ text: "Go to Settings", onPress: () => Linking.openSettings() }]
                );
            }
            return false;
        } catch (error) {
            console.error("Permission error:", error);
            return false;
        }
    };
    
    const saveAndShareCSV = async (csvData: string) => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;

        try {
            const filePath =
                Platform.OS === "android"
                    ? `${RNFS.DownloadDirectoryPath}/financial_report.csv` 
                    : `${RNFS.DocumentDirectoryPath}/financial_report.csv`; 
    
            await RNFS.writeFile(filePath, csvData, "utf8");
    
            ToastAndroid.show("File saved to Downloads!", ToastAndroid.SHORT);
    
            await Share.open({
                url: `file://${filePath}`,
                type: "text/csv",
            });
        } catch (error: unknown) {
            if (typeof error === "object" && error !== null && "message" in error) {
                const errorMessage = (error as { message: string }).message;
                
                if (errorMessage === "User did not share") {
                    console.log("User cancelled sharing.");
                    return; 
                }
            }
    
            console.error("Error saving/opening CSV:", error);
            ToastAndroid.show("Download failed!", ToastAndroid.SHORT);
        }
    };
    
    const generateCSV = (data: AIFinancialAnalysis): string => {
        const headers = [
            "Total Expenses",
            "Total Budget",
            "Exceeded Budget",
            "Expense Trend",
            "Spending Trend",
            "Future Risk Prediction",
            "Savings Amount",
            "Savings Percentage",
            "Budget Utilization Percentage",
            "Budget Utilization Change",
            "Potential Savings Category",
            "Potential Saved Amount",
            "Constant Spending Category",
            "Constant Spending Amount",
            "Top Spending Category",
            "Top Spending Amount",
            "Low Spending Category",
            "Low Spending Amount",
            "Predicted Future Expenses",
            "Predicted Savings Next Month",
            "Warnings",
            "Abnormal Spending Alerts"
        ].join(",");
    
        const row = [
            data.total_expenses,
            data.total_budget,
            data.exceeded_budget ? "Yes" : "No",
            `"${data.expense_trend.replace(/,/g, "")}"`, 
            `"${data.spending_trend.replace(/,/g, "")}"`,
            `"${data.future_risk_prediction.replace(/,/g, "")}"`,
            data.savings.amount,
            data.savings.percentage,
            data.budget_utilization.percentage,
            data.budget_utilization.change,
            data.potential_savings.category,
            data.potential_savings.saved_amount,
            data.constant_spending.category,
            data.constant_spending.amount,
            data.top_spending_category.category,
            data.top_spending_category.amount,
            data.low_spending_category.category,
            data.low_spending_category.amount,
            data.predicted_future_expenses,
            data.predicted_savings_next_month,
            `"${data.warnings.join(" | ")}"`, 
            `"${data.abnormal_spending_alerts.join(" | ")}"`
        ].join(",");
    
        const categoryHeaders = "Category,Amount";
        const categoriesCSV = Object.entries(data.categories || {})
            .map(([category, amount]) => `${category},${amount}`)
            .join("\n");
    
        return `${headers}\n${row}\n\n${categoryHeaders}\n${categoriesCSV}`;
    };
    
    return (
        <TouchableOpacity
            style={{...registrationStyles.button,width:'100%'}}
            onPress={() => {
                const csvData = generateCSV(data);
                saveAndShareCSV(csvData);
            }}
        >
            <Text style={registrationStyles.buttonText}>Download</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    exportButton: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        width: "80%",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default ExportResponse;
