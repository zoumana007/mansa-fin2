import { StyleSheet, Text, View } from "react-native";
import { ContentState } from "../components/ContentState";
import { colors, radius, spacing, typography } from "../theme/tokens";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Bonjour
      </Text>
      <View accessibilityLabel="Solde indisponible" style={styles.card}>
        <Text style={styles.label}>Solde principal</Text>
        <Text style={styles.balance}>—</Text>
        <Text style={styles.notice}>
          Connectez-vous pour consulter les données confirmées par Mansa.
        </Text>
      </View>
      <Text accessibilityRole="header" style={styles.heading}>
        Activité récente
      </Text>
      <ContentState
        message="Aucune donnée chargée. Aucun statut financier n’est simulé."
        state="empty"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: spacing.lg, padding: spacing.lg },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  label: { color: colors.textMuted, fontSize: typography.caption },
  balance: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  notice: { color: colors.textMuted, fontSize: typography.caption, lineHeight: 20 },
  heading: { color: colors.text, fontSize: typography.heading, fontWeight: "700" },
});
