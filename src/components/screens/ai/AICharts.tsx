import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "src/utils/theme";
import { CategoryType } from "@ourtypes/Category";
import { FutureExpensesChart } from "./FutureExpensesChart";
import { CategoryPieChart } from "./CategoryPieChart";
import { AIFinancialAnalysis } from "@ourtypes/Ai";
import { ExportResponse } from "./ExportResponse";


interface AIChartsProps {
    data: AIFinancialAnalysis;
}

export const AICharts: React.FC<AIChartsProps> = ({ data }) => {
    const { total_budget, categories, predicted_future_expenses } = data;

    const CATEGORY_COLORS: Record<CategoryType, string> = {
        Essentials: theme.colors.essentials,
        "Food & Entertainment": theme.colors.food,
        Shopping: theme.colors.shopping,
        "Health & Wellness": theme.colors.health,
        Other: theme.colors.other,
    };

    const pieData = Object.entries(categories)
        .filter(([_, value]) => value > 0)
        .map(([category, value]) => ({
            value,
            color: CATEGORY_COLORS[category as CategoryType],
            label: category,
        }));

    return (
        <View style={styles.container}>

            <CategoryPieChart
                total_budget={total_budget}
                categories={categories}
                categoryColors={CATEGORY_COLORS}
            />
            {predicted_future_expenses > 0 && (
                <>
                    <FutureExpensesChart
                        total_budget={total_budget}
                        predicted_future_expenses={predicted_future_expenses}
                    />
                </>
            )}
            <ExportResponse data={data}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        gap: 20
    },
});

export default AICharts;
