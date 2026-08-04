import { colors, ContentState, radius, spacing, typography } from "@mansa/mobile-ui";
import { StyleSheet, Text, View } from "react-native";

export function CommerceDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Commerce
      </Text>
      <View style={styles.context}>
        <Text style={styles.label}>Établissement actif</Text>
        <Text style={styles.value}>Non sélectionné</Text>
        <Text style={styles.detail}>
          Les chiffres, ventes et règlements ne sont affichés qu’après authentification et
          validation du contexte organisationnel.
        </Text>
      </View>
      <Text accessibilityRole="header" style={styles.heading}>
        Activité
      </Text>
      <ContentState
        message="Aucune donnée Commerce chargée. Aucun chiffre d’affaires ni paiement n’est simulé."
        state="empty"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: spacing.lg, padding: spacing.lg },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  context: {
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
