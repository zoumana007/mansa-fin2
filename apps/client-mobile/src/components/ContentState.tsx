import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/tokens";

interface ContentStateProps {
  message: string;
  state: "empty" | "error" | "loading";
}

export function ContentState({ message, state }: ContentStateProps) {
  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole={state === "error" ? "alert" : "text"}
      style={styles.container}
    >
      {state === "loading" ? <ActivityIndicator color={colors.primary} /> : null}
      <Text style={[styles.message, state === "error" && styles.error]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing.sm, paddingVertical: spacing.lg },
  message: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24,
    textAlign: "center",
  },
  error: { color: colors.danger },
});
