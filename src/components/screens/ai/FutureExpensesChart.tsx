import { commonStyles } from "@components/reusable/commonStyles";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { theme } from "src/utils/theme";
import { aiScreenStyles } from "./aiScreenStyles";

interface FutureExpensesChartProps {
  total_budget: number;
  predicted_future_expenses: number;
}

export const FutureExpensesChart: React.FC<FutureExpensesChartProps> = ({
  total_budget,
  predicted_future_expenses,
}) => {
  const barData = [
    { value: total_budget, label: "Budget", frontColor: theme.colors.card2 },
    { value: predicted_future_expenses, label: "Predicted", frontColor: theme.colors.card4 },
  ];

  const maxValue = Math.max(total_budget, predicted_future_expenses) || 1; 
  const scaledMax = maxValue * 1.2; 

  const formatValue = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`; 
  };

  const step = scaledMax / 4;
  const yAxisLabelTexts = [
    '0',
    formatValue(step),
    formatValue(step * 2),
    formatValue(step * 3),
    formatValue(maxValue * 1.2),
  ];

  return (
    <View style={styles.container}>
      <Text style={commonStyles.header}>Future Expense Prediction</Text>

      <BarChart
        data={barData}
        barWidth={40}
        spacing={30}
        roundedTop
        roundedBottom
        noOfSections={4}
        yAxisThickness={1}
        xAxisThickness={0}
        hideRules
        maxValue={Math.max(total_budget, predicted_future_expenses) * 1.2} 
        barBorderRadius={10}
        showValuesAsTopLabel
        yAxisLabelTexts={yAxisLabelTexts}
        yAxisTextStyle={{width: 48}}
      />

      <View style={styles.labelsContainer}>
        <View style={styles.labelItem}>
          <View style={[styles.colorDot, { backgroundColor: theme.colors.card2 }]} />
          <Text style={aiScreenStyles.dropDownText}>Budget (${total_budget.toFixed(2)})</Text>
        </View>

        <View style={styles.labelItem}>
          <View style={[styles.colorDot, { backgroundColor: theme.colors.card4 }]} />
          <Text style={aiScreenStyles.dropDownText}>Predicted (${predicted_future_expenses.toFixed(2)})</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    gap: 20
  },
  barText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  labelsContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    width: "80%",
    gap: 20
  },
  labelItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.darkText,
  },
});

export default FutureExpensesChart;
