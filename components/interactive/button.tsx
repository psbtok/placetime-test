import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/styles/Colors";
import { Typography } from "@/styles/Typography";

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text: string;
}

const Button = ({ onPress, disabled = false, text }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        isPressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: Colors.textSecondary,
  },
  buttonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  buttonText: {
    color: Colors.background,
    fontSize: Typography.fontSizes.s,
    fontWeight: "bold",
  },
});

export default Button;