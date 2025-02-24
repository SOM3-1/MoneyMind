import React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { theme } from "src/utils/theme";
import { getFontSize } from "@helpers/dynamic";

interface CustomTextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
  style?: object;
  onBlur?: () => void
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label = "Enter text",
  value = "",
  onChangeText = () => { },
  placeholder = "",
  secureTextEntry = false,
  keyboardType = "default",
  style = {},
  onBlur = () => { }
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        onBlur={onBlur}
        contentStyle={styles.labelStyle}
        theme={{
          colors: {
            primary: theme.colors.subtitle,
            background: theme.colors.white, 
            text: theme.colors.subtitle,  
        },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    fontFamily: 'Montserrat-Bold',
    fontSize: getFontSize(14),
    color: theme.colors.subtitle,
    fontWeight: 600,
    height: 56
  },
  labelStyle: {
    color: theme.colors.subtitle,
    fontWeight: 100,
  }
});

export default CustomTextInput;
