import React, { useCallback, useEffect, useState } from "react"
import { Text, View, Image, TouchableOpacity, Linking, useWindowDimensions, ScrollView, Platform, Button } from "react-native"
import { plaidStyles } from "./plaidStyles";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { create, open, dismissLink, LinkSuccess, LinkExit, LinkIOSPresentationStyle, LinkLogLevel } from 'react-native-plaid-link-sdk';
import { useSelector } from "react-redux";
import { AppState } from '@ourtypes/AppState';

export const PlaidScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { width, height } = useWindowDimensions();
    const [isLandscape, setIsLandscape] = useState(width > height);
    const [userId, setUserId] = useState<string | null>(null);

    const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    const user = useSelector((state: AppState) => state.user);
    useEffect(() => {
        if (!user?.uid) return;
        setUserId(user.uid);
        console.log('User ID:', user.uid);

    }, [user]);

    // Update orientation state when dimensions change
    useEffect(() => {
        setIsLandscape(width > height);
    }, [width, height]);


    const handleClose = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    const openPrivacyPolicy = () => {
        Linking.openURL('https://plaid.com/legal/');
    };

    // Adjust spacing based on orientation
    const dynamicSpacing = {
        marginTop: isLandscape ? 10 : 15,
        footerSpacing: isLandscape ? height * 0.14 : height * 0.16,
        containerPadding: isLandscape ? { paddingHorizontal: 24 } : { paddingHorizontal: 15 }
    };

    return (
        <View style={[plaidStyles.container, dynamicSpacing.containerPadding]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={plaidStyles.subContainer}>
                    <TouchableOpacity style={plaidStyles.closeButton} onPress={handleClose}>
                        <Ionicons name="close-outline" size={30} color="#616161" />
                    </TouchableOpacity>

                    <View style={[plaidStyles.box, isLandscape && { flexDirection: 'row', flexWrap: 'wrap' }]}>
                        <View style={isLandscape ? { width: '50%', paddingRight: 10 } : { width: '100%' }}>
                            <Image
                                source={require('../../../assets/images/plaid_image.jpeg')}
                                resizeMode="contain"
                                style={[
                                    plaidStyles.image,
                                    isLandscape && { height: height * 0.3 }
                                ]}
                            />
                            <Text style={[plaidStyles.title, { marginTop: dynamicSpacing.marginTop }]}>
                                AI Personal Finance Manager uses Plaid to connect your account
                            </Text>
                        </View>

                        <View style={isLandscape ? { width: '50%', paddingLeft: 10 } : { width: '100%' }}>
                            <View style={plaidStyles.featureContainer}>
                                <View style={plaidStyles.featureRow}>
                                    <Ionicons name="flash-outline" size={20} color="#000" style={plaidStyles.featureIcon} />
                                    <View style={plaidStyles.featureTextContainer}>
                                        <Text style={plaidStyles.featureTitle}>Connect in seconds</Text>
                                        <Text style={plaidStyles.featureDescription}>8000+ apps trust Plaid to quickly connect to financial institutions</Text>
                                    </View>
                                </View>

                                <View style={plaidStyles.featureRow}>
                                    <Ionicons name="shield-checkmark-outline" size={20} color="#000" style={plaidStyles.featureIcon} />
                                    <View style={plaidStyles.featureTextContainer}>
                                        <Text style={plaidStyles.featureTitle}>Keep your data safe</Text>
                                        <Text style={plaidStyles.featureDescription}>Plaid uses best-in-class encryption to help protect your data</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: dynamicSpacing.footerSpacing }} />

                    <View style={plaidStyles.footerContainer}>
                        <Text style={plaidStyles.footerText}>
                            By continuing, you agree to Plaid's <Text style={plaidStyles.linkText} onPress={openPrivacyPolicy}>Privacy Policy</Text> and to receiving updates on plaid.com
                        </Text>

                        <TouchableOpacity
                            style={plaidStyles.continueButton}

                        >
                            <Text style={plaidStyles.continueButtonText}>
                                Continue
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView>
        </View>
    );
};