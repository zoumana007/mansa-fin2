import { StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../components/ActionButton";
import { colors, spacing, typography } from "../theme/tokens";

export function OnboardingScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.brand}>
        Mansa
      </Text>
      <Text style={styles.title}>Votre argent, clairement.</Text>
      <Text style={styles.body}>
        Un accès sécurisé à vos services Mansa, conçu pour rester compréhensible même avec une
        connexion faible.
      </Text>
      <ActionButton accessibilityHint="Ouvre l’aperçu de l’application" onPress={onContinue}>
        Continuer
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.lg,
  },
  brand: { color: colors.primary, fontSize: typography.heading, fontWeight: "800" },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  body: { color: colors.textMuted, fontSize: typography.body, lineHeight: 24 },
});
