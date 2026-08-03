import { StyleSheet, Text, View } from "react-native";
import { connectionMessage } from "./connectivity";
import type { ConnectionState } from "./connectivity";
import { colors, spacing, typography } from "./tokens";
export function ConnectionBanner({ state }: { state: ConnectionState }) {
  const message = connectionMessage(state);
  if (message === null) return null;
  return (
    <View accessibilityLiveRegion="polite" style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: colors.surfaceRaised, padding: spacing.sm },
  text: { color: colors.text, fontSize: typography.caption, textAlign: "center" },
});
