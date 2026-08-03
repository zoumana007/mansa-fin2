import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/tokens";

export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.body}>Ce module sera activé selon la feuille de route Mansa.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: spacing.md, padding: spacing.lg },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  body: { color: colors.textMuted, fontSize: typography.body },
});
