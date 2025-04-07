import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-paper";
import { theme } from "src/utils/theme";
import { aiScreenStyles } from "./aiScreenStyles";
import { AIFinancialAnalysis } from "@ourtypes/Ai";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { homeScreenStyles } from "../home/homeScreenStyles";

interface AnalyticsSpendingProp {
  aiAnalytics: AIFinancialAnalysis;
}

const size: number = 16;

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Essentials":
      return (
        <FontAwesome
          name="shopping-cart"
          size={size}
          color={theme.colors.iconColor}
        />
      );
    case "Food & Entertainment":
      return (
        <FontAwesome5
          name="utensils"
          size={size}
          color={theme.colors.iconColor}
        />
      );
    case "Shopping":
      return (
        <FontAwesome5
          name="shopping-bag"
          size={size}
          color={theme.colors.iconColor}
        />
      );
    case "Health & Wellness":
      return (
        <FontAwesome
          name="heartbeat"
          size={size}
          color={theme.colors.iconColor}
        />
      );
    default:
      return (
        <FontAwesome5
          name="ellipsis-h"
          size={size}
          color={theme.colors.iconColor}
        />
      );
  }
};

export const AnalyticsSpending: React.FC<AnalyticsSpendingProp> = ({
  aiAnalytics,
}) => {
  return (
    <View style={{gap: 10, marginTop: 20}}>
        <View style={{marginVertical: 10}}>
      <Text style={homeScreenStyles.transactionTitle}>
        Suggested Savings Categories
      </Text></View>
      <Card style={aiScreenStyles.savingsCard}>
        <Card.Content>
          <View
            style={aiScreenStyles.spendingTitleContainer}
          >
            <Text style={homeScreenStyles.transactionTitle}>
              Potential Savings
            </Text>
            <Text style={aiScreenStyles.savingsAmount}>
              ${aiAnalytics.potential_savings.saved_amount}
            </Text>
          </View>
          <View style={homeScreenStyles.categoryContainer}>
            {getCategoryIcon(aiAnalytics.potential_savings.category)}
            <Text style={homeScreenStyles.categoryText}>{aiAnalytics.potential_savings.category}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={aiScreenStyles.savingsCard}>
        <Card.Content>
            <View style={aiScreenStyles.spendingTitleContainer}>
          <Text style={homeScreenStyles.transactionTitle}>
            Constant Spending
          </Text>
          <Text style={aiScreenStyles.savingsAmount}>
            ${aiAnalytics.constant_spending.amount}
          </Text></View>
          <View style={homeScreenStyles.categoryContainer}>
            {getCategoryIcon(aiAnalytics.constant_spending.category)}
            <Text style={homeScreenStyles.categoryText}>{aiAnalytics.constant_spending.category}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};