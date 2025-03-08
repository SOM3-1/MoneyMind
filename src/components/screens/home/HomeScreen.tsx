import React from "react";
import { View } from "react-native";
import { Intro } from "../../reusable/Intro";
import { homeScreenStyles } from "./homeScreenStyles";
import { EmptyData } from "../../reusable/EmptyData";
import { LinkTransactions } from "./LinkTransactions";

export const HomeScreen: React.FC = () => {
  return (
    <View style={homeScreenStyles.container}>
      <View style={homeScreenStyles.homeConatiner}>
        <Intro />
        <EmptyData type={'transactions'}/>
      </View>
      <LinkTransactions/>
    </View>
  );
};