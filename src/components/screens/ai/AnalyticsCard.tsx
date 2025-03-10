import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-paper";
import { theme } from "src/utils/theme";
import { aiScreenStyles } from "./aiScreenStyles";
import { AIFinancialAnalysis } from "@ourtypes/Ai";

interface AnalyticsCardProp {
  aiAnalytics: AIFinancialAnalysis;
}

const Icons = () => {
  return (
    <Image
      source={require("./../../../assets/images/star.png")}
      style={{ position: "absolute", right: 5, top: 10 }}
    />
  );
};

export const AnalyticsCard: React.FC<AnalyticsCardProp> = ({ aiAnalytics }) => {
  return (
    <>
      <View style={aiScreenStyles.row}>
        <Card
          style={[aiScreenStyles.card, { backgroundColor: theme.colors.card1 }]}
        >
          <Card.Content>
            <Text style={aiScreenStyles.cardTitle}>Total Expenses</Text>
            <Text style={aiScreenStyles.cardSubTitle}>
              ${aiAnalytics.total_expenses}
            </Text>
            <Icons />
          </Card.Content>
        </Card>
        <Card
          style={[aiScreenStyles.card, { backgroundColor: theme.colors.card2 }]}
        >
          <Card.Content>
            <Text style={aiScreenStyles.cardTitle}>Exceeded Budget</Text>
            <Text style={aiScreenStyles.cardSubTitle}>
              {aiAnalytics.exceeded_budget} times
            </Text>
          </Card.Content>
        </Card>
      </View>
      <View style={aiScreenStyles.row}>
        <Card
          style={[aiScreenStyles.card, { backgroundColor: theme.colors.card3 }]}
        >
          <Card.Content>
            <Text style={aiScreenStyles.cardTitle}>Savings</Text>
            <Text style={aiScreenStyles.cardSubTitle}>
              ${aiAnalytics.savings.amount}
            </Text>
            <Text style={aiScreenStyles.cardTitle}>
              +{aiAnalytics.savings.percentage}
            </Text>
            <Icons />
          </Card.Content>
        </Card>
        <Card
          style={[aiScreenStyles.card, { backgroundColor: theme.colors.card4 }]}
        >
          <Card.Content>
            <Text style={aiScreenStyles.cardTitle}>Budget Utilization</Text>
            <Text style={aiScreenStyles.cardSubTitle}>
              {aiAnalytics.budget_utilization.percentage}
            </Text>
            <Text style={aiScreenStyles.cardTitle}>
              +{aiAnalytics.budget_utilization.change}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};
