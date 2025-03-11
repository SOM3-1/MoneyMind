import React, { useState } from "react";
import { View, TouchableWithoutFeedback, ActivityIndicator, ToastAndroid } from "react-native";
import { homeScreenStyles } from "./homeScreenStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { create, open } from "react-native-plaid-link-sdk";
import { getPlaidLinkToken, exchangePublicToken, getTransactions } from "@services/plaidService";

export const LinkTransactions: React.FC<{onRefresh: ()=> void}> = ({onRefresh}) => {
    const [loading, setLoading] = useState(false);

    const handleTransactions = async () => {
        setLoading(true);

        const linkToken = await getPlaidLinkToken();
        if (!linkToken) {
            ToastAndroid.show("Failed to generate Token!", ToastAndroid.SHORT);
            console.error("Failed to retrieve token");
            setLoading(false);
            return;
        }

        create({ token: linkToken});

        open({
            onSuccess: async (successData) => {
                console.log("Plaid linked successfully:", successData);

                if (!successData.publicToken) {
                    console.error("Public token is missing!");
                    setLoading(false);
                    return;
                }

                const accessToken = await exchangePublicToken(successData.publicToken);
                if (!accessToken) {
                    ToastAndroid.show("Failed to generate access Token!", ToastAndroid.SHORT);
                    setLoading(false);
                    return;
                }
                if (accessToken) {
                    const result = await getTransactions(accessToken);
                    if(result){
                        onRefresh();
                        ToastAndroid.show("Retrieved Transactions!!", ToastAndroid.SHORT);
                    }
                    else{
                        ToastAndroid.show("Failed to get Transactions!", ToastAndroid.SHORT);
                    }
                  }

                setLoading(false);
            },
            onExit: (exitData) => {
                console.log("Plaid exit:", exitData);
                setLoading(false);
            },
        });
    };

    return (
        <View style={homeScreenStyles.fab}>
            <TouchableWithoutFeedback onPress={handleTransactions} disabled={loading}>
                <View style={{ padding: 10 }}>
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <MaterialIcons name="link" size={24} color="white" style={homeScreenStyles.fabIcon} />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};