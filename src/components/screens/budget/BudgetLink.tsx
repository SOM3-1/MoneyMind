import React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import { homeScreenStyles } from "../home/homeScreenStyles";
import { budgetScreenStyles } from "./budgetScreenStyles";

export const BudgetLink: React.FC = () => {

    const addBudget = () => {
    }
    
    return (
        <View style={homeScreenStyles.fab}>
            <TouchableWithoutFeedback onPress={addBudget}>
                <View style={{ padding: 10 }}>
                <MaterialIcons name="add" size={40} color="white" style={budgetScreenStyles.fabIcon}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};
