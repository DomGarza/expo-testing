import { Dimensions } from "react-native";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Screen = {
  h: Dimensions.get('window').height,
  w: Dimensions.get('window').width,
};


export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
