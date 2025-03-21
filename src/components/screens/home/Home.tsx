import React from "react"
import { Text, View, TouchableOpacity, ScrollView, useWindowDimensions, SafeAreaView } from "react-native"
import { homeStyles } from "./homeStyles";
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import FastImage from "react-native-fast-image";

type RootStackParamList = {
    RedirectingScreen: undefined
};

export const Home: React.FC = () => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'RedirectingScreen'>>();

    const handlePress = () => {
        navigation.navigate("RedirectingScreen");
    };
    
    return (
        <SafeAreaView style={homeStyles.safeArea}>
            <ScrollView 
                contentContainerStyle={homeStyles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={homeStyles.headerContainer}>
                    <Text style={homeStyles.title}>Hello, Name!</Text>
                    <Text style={homeStyles.subTitle}>Start tracking your expenses to gain valuable insights into your spending habits.</Text>
                </View>

                <View style={[
                    homeStyles.imgContainer, 
                    isLandscape && homeStyles.imgContainerLandscape
                ]}>
                    <FastImage
                        style={[
                            homeStyles.gifStyle, 
                            isLandscape && homeStyles.gifStyleLandscape
                        ]}
                        source={require("../../../assets/gif/transactions.gif")}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                    <View style={homeStyles.textWrapper}>
                        <Text style={homeStyles.description}>Your expenses will appear here. </Text>
                        <Text style={homeStyles.description}>Tap the button below to get started.</Text>
                    </View>
                </View>
                
                <View style={{height : height * 0.1}} />
            </ScrollView>
            
            <TouchableOpacity style={homeStyles.addButton} onPress={handlePress}>
                <Fontisto name="link" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};