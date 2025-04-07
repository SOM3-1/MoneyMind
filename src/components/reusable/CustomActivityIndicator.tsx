import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "src/utils/theme";

export const CustomActivityIndicator = () => {
  return (
    <View style={style.loaderOverlay}>
      <ActivityIndicator color={theme.colors.primary} size={50} />
    </View>
  );
};
const style = StyleSheet.create({
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
