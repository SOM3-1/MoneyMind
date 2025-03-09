import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "src/utils/theme";
import { Budget } from "@ourtypes/Budget";
import { DateTime } from "luxon";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


const CATEGORY_COLORS: Record<string, string> = {
    "Essentials": "#FFAA00",
    "Food & Entertainment": "#D11F4E",
    "Shopping": "#0047AB",
    "Health & Wellness": "#2CCCE4",
    "Other": "#AAAAAA",
    "Remaining": "#5DAE55",
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

    const totalSpent = Object.values(budget.categoryTotals || {}).reduce((sum, val) => sum + val, 0);
    const remaining = budget.amount - totalSpent;

    const categories = Object.entries(budget.categoryTotals || {}).filter(([_, value]) => value > 0);
    const progressValues = [...categories, ["Remaining", remaining]].filter(([_, value]) => value > 0);

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const handleEdit = () => {
        navigation.navigate("EditBudget", { budget });
    }

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{budget.title}</Text>
                <Text style={styles.amount}>${budget.amount.toFixed(2)}</Text>
            </View>

            <Text style={styles.dateRange}>
                {formatDate(budget.fromDate)} - {formatDate(budget.toDate)}
            </Text>

            <View style={styles.progressBarContainer}>
                {progressValues.map(([category, value], index) => (
                    <View
                        key={index}
                        style={[styles.progressSegment, { backgroundColor: CATEGORY_COLORS[category] || "#CCCCCC", flex: value }]}
                    />
                ))}
            </View>

            <View style={styles.categoriesContainer}>
                {progressValues.map(([category, value]) => (
                    <View key={category} style={styles.categoryItem}>
                        <View style={[styles.colorDot, { backgroundColor: CATEGORY_COLORS[category] }]} />
                        <Text style={styles.categoryText}>{category} (${value})</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={handleEdit} style={styles.editIcon}>
            <MaterialCommunityIcons name="pencil-outline" size={24} color={theme.colors.subtitle} /></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 7,
        padding: 15,
        marginBottom: 10,
        width: 364,
        height: 'auto',
        borderWidth: 0.5,
        borderColor: theme.colors.subtitle,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        lineHeight: 22.4,
        color: theme.colors.darkText,
    },
    amount: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        lineHeight: 26.6,
        color: theme.colors.primary,
    },
    dateRange: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 25.6,
        color: theme.colors.darkText,
        marginBottom: 10,
    },
    progressBarContainer: {
        flexDirection: "row",
        height: 8,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#E0E0E0",
        marginBottom: 10,
    },
    progressSegment: {
        height: "100%",
    },
    categoriesContainer: {
        flexDirection: "column",
        marginVertical: 10,

    },
    categoryItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 5,
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: '50%',
        marginRight: 6,
        textAlign: 'center'
    },
    categoryText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 25.6,
        color: theme.colors.darkText,
    },
    editIcon: {
       alignSelf:'flex-end',
        width: 30,
        height: 30
    },
});

export default BudgetItem;
