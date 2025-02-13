import { errorText } from '@constants/errorText';
import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { customErrorStyles } from './customErrorStyles';
import CustomText from '@components/reusable/CustomText';

interface CustomErrorProps {
  errorMessage: string;
  crashError: Error;
}

export const CustomError: React.FC<CustomErrorProps> = () => {
  return (
    <View style={customErrorStyles.screen}>
      <FastImage
        style={{ width: 200, height: 200 }}
        source={require('./../../assets/gif/error.gif')}
        resizeMode={FastImage.resizeMode.contain}
        accessibilityLabel='Error Image'
      />
      <View style={customErrorStyles.content}>
        <CustomText style={customErrorStyles.header}>{errorText.header}</CustomText>
        <CustomText style={customErrorStyles.body}>{errorText.body}</CustomText>
      </View>
    </View>
  );
};
