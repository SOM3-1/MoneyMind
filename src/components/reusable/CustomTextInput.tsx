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
  onBlur?: () => void;
  editable?: boolean;
  rightIcon?: React.ReactNode;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label = "Enter text",
  value = "",
  onChangeText = () => {},
  placeholder = "",
  secureTextEntry = false,
  keyboardType = "default",
  style = {},
  editable = true,
  onBlur = () => {},
  rightIcon = null, 
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
        editable={editable}
        right={rightIcon ? <TextInput.Icon icon={() => rightIcon} /> : null}
        theme={{
          colors: {
            primary: theme.colors.subtitle,
            background: theme.colors.background,
            text: theme.colors.darkText,
          },
        }}
        contentStyle={{fontFamily: theme.fonts.regular,
          fontSize: 14,
          color: theme.colors.darkText,}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    fontFamily: theme.fonts.bold,
    fontSize: getFontSize(14),
    color: theme.colors.darkText,
    height: 56,
  },
  labelStyle: {
    color: theme.colors.darkText,
    fontFamily: theme.fonts.bold,
  },
});

export default CustomTextInput;
