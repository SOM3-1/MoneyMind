
import React from "react";
import { View, FlatList, RefreshControl, Text } from "react-native";
import { customErrorStyles } from "@components/error/customErrorStyles";
import CustomText from "@components/reusable/CustomText";
import { Budget } from "@ourtypes/Budget";
import { homeScreenStyles } from "../home/homeScreenStyles";
import { BudgetItem } from "./BudgetItem";

interface Props {
    budgets: Budget[];
    onRefresh: () => void;
    refreshing: boolean;
}

export const BudgetScreenData: React.FC<Props> = ({ budgets, onRefresh, refreshing }) => {
    return (
        <View style={homeScreenStyles.transactionsContainer}>
            <Text style={homeScreenStyles.sectionTitle}>{budgets.length} Budget Plans</Text>
            {budgets.length ?
                <FlatList
                    data={budgets}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <BudgetItem budget={item} />}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    contentContainerStyle={{ paddingBottom: 500 }}
                /> :
                <View style={homeScreenStyles.noTransactions}>
                    <CustomText style={customErrorStyles.body}>No Budgets found!</CustomText>
                </View>}
        </View>
    );
};