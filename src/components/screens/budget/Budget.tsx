import { EmptyData } from "@components/reusable/EmptyData"
import { Intro } from "@components/reusable/Intro"
import React from "react"
import { View } from "react-native"
import { homeScreenStyles } from "../home/homeScreenStyles"
import { BudgetLink } from "./BudgetLink"

export const Budget: React.FC = () =>{
    return (<View style={homeScreenStyles.container}>
        <View style={homeScreenStyles.homeConatiner}>
          <Intro />
          <EmptyData type={'budget'}/>
        </View>
        <BudgetLink/>
      </View>)
}