import { colors, spacing, typography } from "@mansa/mobile-ui";
import { StyleSheet, Text, View } from "react-native";

export function CommercePlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.body}>
        Ce module sera activé après le backend Commerce, le KYB, les rôles et l’isolation par
        organisation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: spacing.md, padding: spacing.lg },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  body: { color: colors.textMuted, fontSize: typography.body, lineHeight: 24 },
});
