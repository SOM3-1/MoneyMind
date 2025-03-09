import React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { homeScreenStyles } from "../home/homeScreenStyles";
import { budgetScreenStyles } from "./budgetScreenStyles";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const BudgetLink: React.FC = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const addBudget = () => {
        navigation.navigate("AddBudget");
    }

    return (
        <View style={homeScreenStyles.fab}>
            <TouchableWithoutFeedback onPress={addBudget}>
                <View style={{ padding: 10 }}>
                    <MaterialIcons name="add" size={40} color="white" style={budgetScreenStyles.fabIcon} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};
