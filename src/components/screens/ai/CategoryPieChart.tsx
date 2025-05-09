
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { CategoryType } from "@ourtypes/Category";
import { commonStyles } from "@components/reusable/commonStyles";
import { aiScreenStyles } from "./aiScreenStyles";
import { budgetScreenStyles } from "../budget/budgetScreenStyles";

interface CategoryPieChartProps {
    total_budget: number;
    categories: Partial<Record<CategoryType, number>>;
    categoryColors: Record<CategoryType, string>;
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
    total_budget,
    categories,
    categoryColors,
}) => {
    const pieData = Object.entries(categories)
        .filter(([_, value]) => value > 0)
        .map(([category, value]) => ({
            value,
            color: categoryColors[category as CategoryType],
            label: category,
        }));

    return (
        <><PieChart
            data={pieData}
            donut
            showText
            textSize={16}
            radius={100}
            innerRadius={70}
            centerLabelComponent={() => (
                <>
                    <Text style={{ ...commonStyles.header, textAlign: 'center' }}>
                        ${total_budget.toFixed(2)}
                    </Text>
                    <Text style={{ ...aiScreenStyles.dropDownText, textAlign: 'center' }}>Budget</Text>
                </>
            )}
        />

            <View style={styles.categoriesContainer}>
                {pieData.map(({ label, value, color }) => (
                    <View key={label} style={styles.categoryItem}>
                        <View style={styles.categoryLeft}>
                            <View style={[styles.colorDot, { backgroundColor: color }]} />
                            <Text style={budgetScreenStyles.categoryText}>{label}</Text>
                        </View>
                        <Text style={commonStyles.header}>${value.toFixed(2)}</Text>
                    </View>
                ))}
            </View></>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
    },
    categoriesContainer: {
        marginTop: 20,
        width: "100%",
    },
    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    categoryLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    colorDot: {
        width: 14,
        height: 14,
        borderRadius: 6,
        marginRight: 10,
    },
});
