import { PixelRatio } from "react-native";
export const getFontSize = (size:number):number => size * PixelRatio.getFontScale();