import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DateTime } from "luxon";
import { homeScreenStyles } from "./homeScreenStyles";
import { Transaction } from "@ourtypes/Transaction";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { theme } from "src/utils/theme";

const size: number = 16

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Essentials":
      return <FontAwesome name="shopping-cart" size={size} color={theme.colors.iconColor} />;
    case "Food & Entertainment":
      return <FontAwesome5 name="utensils" size={size} color={theme.colors.iconColor}/>;
    case "Shopping":
      return <FontAwesome5 name="shopping-bag" size={size} color={theme.colors.iconColor}/>;
    case "Health & Wellness":
      return <FontAwesome name="heartbeat" size={size} color={theme.colors.iconColor} />;
    default:
      return <FontAwesome5 name="ellipsis-h" size={size} color={theme.colors.iconColor}/>;
  }
};

export const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const formattedDate = DateTime.fromISO(transaction.date).toFormat("MMM dd");

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleEdit = () => {
    navigation.navigate("EditTransactions", { transaction });
  }

  return (
    <View style={homeScreenStyles.transactionItem}>
      <View style={homeScreenStyles.dateContainer}>
        <Text style={homeScreenStyles.dateMonth}>{formattedDate.split(" ")[0]}</Text>
        <Text style={homeScreenStyles.dateDay}>{formattedDate.split(" ")[1]}</Text>
      </View>

      <View style={homeScreenStyles.transactionDetails}>
        <Text style={homeScreenStyles.transactionTitle} numberOfLines={1}>{transaction.description}</Text>
        <View style={homeScreenStyles.categoryContainer}>
          {getCategoryIcon(transaction.category)}
          <Text style={homeScreenStyles.categoryText}> {transaction.category}</Text>
        </View>
      </View>

      <View style={homeScreenStyles.amountContainer}>
        <Text style={homeScreenStyles.amountText}>${transaction.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={handleEdit} style={{width: 30, height: 30}}>
          <MaterialCommunityIcons name="pencil-outline" size={24} color={theme.colors.subtitle} /></TouchableOpacity>
      </View>
    </View>
  );
};
