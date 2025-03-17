import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/styles/Colors";

interface CustomStatusBarProps {
  backgroundColor?: string;
  barStyle?: "light-content" | "dark-content";
}

const CustomStatusBar = ({
  backgroundColor = Colors.background,
  barStyle = "dark-content",
}: CustomStatusBarProps) => {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </SafeAreaView>
  );
};

export default CustomStatusBar;