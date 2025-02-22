import { customErrorStyles } from '@components/error/customErrorStyles';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { offlineOverlayStyles } from './offlineOverlayStyles';

export const OfflineOverlay = () => {
    return (
        <View style={offlineOverlayStyles.overlay}>
            <FastImage
                source={require('./../../assets/gif/no_connection.gif')}
                style={offlineOverlayStyles.image}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{ gap: 10 }}><Text style={customErrorStyles.header}>You're Offline</Text>
                <Text style={customErrorStyles.body}>
                    Please check your internet connection and try again.
                </Text></View>
        </View>
    );
};

