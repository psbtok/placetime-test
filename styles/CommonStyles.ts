import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Typography } from "./Typography";

export const commonStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.greyBorder,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: Typography.fontSizes.m,
    color: Colors.textPrimary,
    backgroundColor: Colors.background,
  },

  textField: {
    height: 120,
    textAlignVertical: "top"
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  buttonDisabled: {
    backgroundColor: Colors.primaryLight,
  },

  buttonText: {
    color: Colors.background,
    fontSize: Typography.fontSizes.s,
    fontWeight: "bold",
  },
});
