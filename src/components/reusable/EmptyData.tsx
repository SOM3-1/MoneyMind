import React from "react";
import { View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { homeScreenStyles } from "../screens/home/homeScreenStyles";
import { gifMappings } from "@constants/gifMappings";
import { ScreenType } from "@ourtypes/ScreenType";

const content: Record<ScreenType, { title: string; message1: string; message2: string }> = {
    [ScreenType.TRANSACTIONS]: {
        title: "No Transactions Yet",
        message1: "Your expenses will appear here.",
        message2: "Tap the button below to add your first transaction."
    },
    [ScreenType.BUDGET]: {
        title: "No Budgets Set",
        message1: "Your budget plans will appear here.",
        message2: "Tap the button below to get started."
    },
    [ScreenType.AI]: {
        title: "No Predictions Yet",
        message1: "Your financial insights will appear here.",
        message2: ""
    },
};

export const EmptyData: React.FC<{ type: ScreenType }> = ({ type }) => {
    const { title, message1, message2 } = content[type];
    const gif = gifMappings[type];

    return (
        <View style={homeScreenStyles.emptyTransactionsContainer}>
            <FastImage
                source={gif}
                style={homeScreenStyles.image}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View>
                {message1 && <Text style={homeScreenStyles.body}>{message1}</Text>}
                {message2 && <Text style={homeScreenStyles.body}>{message2}</Text>}
            </View>
        </View>
    );
};