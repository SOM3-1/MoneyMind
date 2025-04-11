import React from "react";
import { Image, View } from "react-native";

export const LogoComponent: React.FC = () => {
    return (<View style={{justifyContent:'center'}}><Image source={require('./../../assets/images/mini_logo.png')} style={{width: 110, height: 110}} /></View>)
}