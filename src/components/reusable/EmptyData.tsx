import React from "react"
import { View, Text } from 'react-native';
import FastImage from "react-native-fast-image";
import { homeScreenStyles } from "../screens/home/homeScreenStyles";
import { gifMappings } from "@constants/gifMappings";
type EmptyDataType = "transactions" | "budget";

const content: Record<EmptyDataType, { title: string; message1: string; message2: string }> = {
    transactions: {
        title: "No Transactions Yet",
        message1: "Your expenses will appear here.",
        message2: "Tap the button below to add your first transaction."
    },
    budget: {
        title: "No Budgets Set",
        message1: "Your budget plans will appear here.",
        message2: "Tap the button below to get started."
    }
}

export const EmptyData: React.FC<{ type: EmptyDataType }> = ({ type }) => {

    const { title, message1, message2 } = content[type] || content.transactions;
    const gif = gifMappings[type];

    return (
        <View style={homeScreenStyles.emptyTransactionsContainer}>
            <FastImage
                source={gif}
                style={homeScreenStyles.image}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View>
                <Text style={homeScreenStyles.body}>{message1}</Text>
                <Text style={homeScreenStyles.body}>{message2}</Text></View>
        </View>
    );
}

