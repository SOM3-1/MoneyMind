import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

const CustomText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.defaultText, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    color: theme.colors.black
  },
});

export default CustomText;
