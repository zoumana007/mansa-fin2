import { colors, ContentState, radius, spacing, typography } from "@mansa/mobile-ui";
import { StyleSheet, Text, View } from "react-native";
export function AgentDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Point de service
      </Text>
      <View style={styles.status}>
        <Text style={styles.label}>Statut opérationnel</Text>
        <Text style={styles.value}>Non connecté</Text>
        <Text style={styles.detail}>
          Aucune caisse, aucun float et aucune opération ne sont disponibles hors authentification.
        </Text>
      </View>
      <Text accessibilityRole="header" style={styles.heading}>
        Activité
      </Text>
      <ContentState
        message="Aucune donnée Agent chargée. Les montants et statuts viennent exclusivement du backend."
        state="empty"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, gap: spacing.lg, padding: spacing.lg },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  status: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  label: { color: colors.textMuted, fontSize: typography.caption },
  value: { color: colors.text, fontSize: typography.heading, fontWeight: "800" },
  detail: { color: colors.textMuted, fontSize: typography.caption, lineHeight: 20 },
  heading: { color: colors.text, fontSize: typography.heading, fontWeight: "700" },
});
