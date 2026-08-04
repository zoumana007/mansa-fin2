import { ActionButton, colors, spacing, typography } from "@mansa/mobile-ui";
import { StyleSheet, Text, View } from "react-native";

export function CommerceOnboardingScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.brand}>
        Mansa Commerce
      </Text>
      <Text style={styles.title}>Votre activité, sans ambiguïté.</Text>
      <Text style={styles.body}>
        L’accès aux ventes dépend de votre organisation, de votre rôle, du KYB et de l’établissement
        actif.
      </Text>
      <ActionButton
        accessibilityHint="Ouvre l’aperçu Commerce sans activer les ventes"
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
