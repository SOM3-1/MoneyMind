import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "src/utils/theme";
import { Budget } from "@ourtypes/Budget";
import { DateTime } from "luxon";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { budgetScreenStyles } from "./budgetScreenStyles";

const CATEGORY_COLORS: Record<string, string> = {
    "Essentials": theme.colors.essentials,
    "Food & Entertainment": theme.colors.food,
    "Shopping": theme.colors.shopping,
    "Health & Wellness": theme.colors.health,
    "Other": theme.colors.other,
    "Remaining": theme.colors.remaining,
};

export const BudgetItem: React.FC<{ budget: Budget }> = ({ budget }) => {

    const formatDate = (dateString: string) => {
        const date = DateTime.fromISO(dateString);
        const day = date.day;
        const suffix =
            day % 10 === 1 && day !== 11 ? "st" :
                day % 10 === 2 && day !== 12 ? "nd" :
                    day % 10 === 3 && day !== 13 ? "rd" : "th";
        return `${day}${suffix} ${date.toFormat("MMM yyyy")}`;
    };

    const totalSpent = parseFloat(Object.values(budget.categoryTotals || {}).reduce((sum, val) => sum + val, 0).toFixed(2));
    const remaining = parseFloat((budget.amount - totalSpent).toFixed(2));

    const categories = Object.entries(budget.categoryTotals || {}).filter(([_, value]) => value > 0);
    const progressValues = [...categories, ["Remaining", remaining]].filter(([_, value]) => value > 0);

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const handleEdit = () => {
        navigation.navigate("EditBudget", { budget });
    }

    return (
        <View style={budgetScreenStyles.card}>
            <View style={budgetScreenStyles.header}>
                <Text style={budgetScreenStyles.title} numberOfLines={1}>{budget.title}</Text>
                <Text style={budgetScreenStyles.amount}>${budget.amount.toFixed(2)}</Text>
            </View>

            <Text style={budgetScreenStyles.dateRange}>
                {formatDate(budget.fromDate)} - {formatDate(budget.toDate)}
            </Text>

            <View style={budgetScreenStyles.progressBarContainer}>
                {progressValues.map(([category, value], index) => (
                    <View
                        key={index}
                        style={[budgetScreenStyles.progressSegment, { backgroundColor: CATEGORY_COLORS[category] || "#CCCCCC", flex: value }]}
                    />
                ))}
            </View>

            <View style={budgetScreenStyles.categoriesContainer}>
                {progressValues.map(([category, value]) => (
                    <View key={category} style={budgetScreenStyles.categoryItem}>
                        <View style={[budgetScreenStyles.colorDot, { backgroundColor: CATEGORY_COLORS[category] }]} />
                        <Text style={budgetScreenStyles.categoryText}>{category} (${value})</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={handleEdit} style={budgetScreenStyles.editIcon}>
            <MaterialCommunityIcons name="pencil-outline" size={24} color={theme.colors.subtitle} /></TouchableOpacity>
        </View>
    );
};


