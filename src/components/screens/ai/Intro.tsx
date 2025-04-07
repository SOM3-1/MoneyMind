import React from "react";
import { View, Text } from "react-native";
import { aiScreenStyles } from "./aiScreenStyles";

export const Intro: React.FC = () => {

  return (
    <View style={{alignSelf:'flex-start'}}>
      <Text style={aiScreenStyles.title}>AI Powered Insights</Text>
      <Text style={aiScreenStyles.subTitle}>See your financial story unfold.</Text>
    </View>
  );
};
