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
    width: '100%',
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

  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.alertRed,
  },
  inputLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.xs,
    marginBottom: 6,
  },
  textSecondary: {
    color: Colors.textSecondary,
  },

  errorText: {
    width: '100%',
    textAlign: 'left',
    marginBottom: 2,
    opacity: 0,
    color: Colors.alertRed,
    fontSize: Typography.fontSizes.xs,
  },
  errorTextVisible: {
    opacity: 1,
  },

  inputContainer: {
    width: '100%',
  },
  textFieldContainer: {
    color: Colors.textSecondary,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
