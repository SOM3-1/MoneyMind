import React, { useEffect } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { redirectingStyle } from "./redirectingStyle";
import { StackNavigationProp } from "@react-navigation/stack";
import FastImage from "react-native-fast-image";

// Define the navigation stack types
type RootStackParamList = {
    PlaidScreen: undefined;
};

export const RedirectingScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

      useEffect(() => {
        setTimeout(() => {
          navigation.navigate("PlaidScreen"); // Navigate after 300ms
        }, 300);
      }, []);

    return (
        <View style={[
            redirectingStyle.container,
            isLandscape && {justifyContent: 'center', alignItems: 'center', flex: 1  } 
        ]}>
            <View style={[
                redirectingStyle.box,
                isLandscape && redirectingStyle.boxLandscape
            ]}>
                <FastImage
                    style={[
                        redirectingStyle.gifStyle,
                        isLandscape && redirectingStyle.gifStyleLandscape
                    ]}
                    source={require("../../../assets/gif/redirecting.gif")}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={[
                    redirectingStyle.text
                ]}>
                    You will be redirected to Plaid for quick and easy financial planning.
                </Text>
            </View>
        </View>
    );
};
