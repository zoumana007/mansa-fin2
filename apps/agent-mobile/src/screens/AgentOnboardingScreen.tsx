import { ActionButton, colors, spacing, typography } from "@mansa/mobile-ui";
import { StyleSheet, Text, View } from "react-native";
export function AgentOnboardingScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.brand}>
        Mansa Agent
      </Text>
      <Text style={styles.title}>Un réseau cash maîtrisé.</Text>
      <Text style={styles.body}>
        L’accès opérationnel dépend de votre enrôlement, de votre appareil et de l’activation de
        votre point de service.
      </Text>
      <ActionButton
        accessibilityHint="Ouvre l’aperçu Agent sans activer de caisse"
        onPress={onContinue}
      >
        Continuer
      </ActionButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", gap: spacing.lg, padding: spacing.lg },
  brand: { color: colors.primary, fontSize: typography.heading, fontWeight: "800" },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  body: { color: colors.textMuted, fontSize: typography.body, lineHeight: 24 },
});
