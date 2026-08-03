import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "./tokens";
export function ActionButton({
  accessibilityHint,
  children,
  onPress,
  variant = "primary",
}: {
  accessibilityHint: string;
  children: ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "secondary" ? styles.secondary : styles.primary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={variant === "secondary" ? styles.secondaryText : styles.primaryText}>
        {children}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: radius.md,
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  primary: { backgroundColor: colors.primary },
  secondary: { borderColor: colors.border, borderWidth: 1 },
  pressed: { opacity: 0.72 },
  primaryText: { color: colors.primaryText, fontSize: typography.body, fontWeight: "700" },
  secondaryText: { color: colors.text, fontSize: typography.body, fontWeight: "700" },
});
