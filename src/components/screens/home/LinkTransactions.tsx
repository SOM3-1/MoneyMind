import React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import { homeScreenStyles } from "./homeScreenStyles";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";

export const LinkTransactions: React.FC = () => {

    const handleTransactions = () => {
    }

    return (
        <View style={homeScreenStyles.fab}>
            <TouchableWithoutFeedback onPress={handleTransactions}>
                <View style={{ padding: 10 }}>
                <MaterialIcons name="link" size={24} color="white" style={homeScreenStyles.fabIcon}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};
