import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Typography } from "./Typography";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: Typography.fontSizes.m,
    color: Colors.textPrimary,
    backgroundColor: Colors.background,
    marginBottom: 12,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  buttonDisabled: {
    backgroundColor: Colors.primaryLight,
  },

  buttonText: {
    color: Colors.background,
    fontSize: Typography.fontSizes.m,
    fontWeight: "bold",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  checkboxText: {
    marginLeft: 8,
    fontSize: Typography.fontSizes.s,
    color: Colors.textPrimary,
  },
});
