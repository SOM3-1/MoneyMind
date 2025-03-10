import React, { useState } from "react";
import { View, Image } from "react-native";
import { Snackbar } from "react-native-paper";
import { AIFinancialAnalysis } from "@ourtypes/Ai";
import { aiScreenStyles } from "./aiScreenStyles";
import { AnalyticsCard } from "./AnalyticsCard";
import { AnalyticsSpending } from "./AnalyticsSpending";
import { WarningDialog } from "@components/reusable/WarningDialog";

interface AIScreenDataProps {
    aiAnalytics: AIFinancialAnalysis;
}

export const AIScreenData: React.FC<AIScreenDataProps> = ({ aiAnalytics }) => {

    const [warningDialogVisible, setWarningDialogVisible] = React.useState(aiAnalytics?.warnings?.length > 0);

    return (
        <View style={aiScreenStyles.dataContainer}>
            <WarningDialog
                visible={warningDialogVisible}
                onDismiss={() => setWarningDialogVisible(false)}
                message={aiAnalytics.warnings[0]}
            />
            <AnalyticsCard aiAnalytics={aiAnalytics} />
            <AnalyticsSpending aiAnalytics={aiAnalytics} />
        </View>
    );
};

export default AIScreenData;
