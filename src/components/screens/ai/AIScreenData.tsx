import React from "react";
import { View, Image } from "react-native";
import { Snackbar } from "react-native-paper";
import { AIFinancialAnalysis } from "@ourtypes/Ai";
import { aiScreenStyles } from "./aiScreenStyles";
import { AnalyticsCard } from "./AnalyticsCard";
import { AnalyticsSpending } from "./AnalyticsSpending";

interface AIScreenDataProps {
  aiAnalytics: AIFinancialAnalysis;
}

export const AIScreenData: React.FC<AIScreenDataProps> = ({ aiAnalytics }) => {
  const [visible, setVisible] = React.useState(aiAnalytics.warnings.length > 0);

  return (
    <View style={aiScreenStyles.dataContainer}>
      {aiAnalytics.warnings.length > 0 && (
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{ label: "OK", onPress: () => setVisible(false) }}
        >
          {aiAnalytics.warnings[0]}
        </Snackbar>
      )}
      <AnalyticsCard aiAnalytics={aiAnalytics} />
      <AnalyticsSpending aiAnalytics={aiAnalytics} />
    </View>
  );
};

export default AIScreenData;
