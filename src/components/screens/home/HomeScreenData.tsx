import React from "react";
import { View, FlatList, RefreshControl, Text } from "react-native";
import { homeScreenStyles } from "./homeScreenStyles";
import { Transaction } from "@ourtypes/Transaction";
import { TransactionItem } from "./TransactionItem";
import { customErrorStyles } from "@components/error/customErrorStyles";
import CustomText from "@components/reusable/CustomText";

interface Props {
  transactions: Transaction[];
  onRefresh: () => void;
  refreshing: boolean;
}

export const HomeScreenData: React.FC<Props> = ({ transactions, onRefresh, refreshing }) => {
  return (
    <View style={homeScreenStyles.transactionsContainer}>
      <Text style={homeScreenStyles.sectionTitle}>{transactions.length} Expenses Added</Text>
      {transactions.length ?
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={()=><View style ={{height: 20}} />}
        contentContainerStyle={{paddingBottom: 500}}
      /> :
      <View style={homeScreenStyles.noTransactions}>
        <CustomText style={customErrorStyles.body}>No transactions found!</CustomText>
      </View>}
    </View>
  );
};
