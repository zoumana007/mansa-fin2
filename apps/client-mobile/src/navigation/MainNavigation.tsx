import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { PlaceholderScreen } from "../screens/PlaceholderScreen";
import { colors, spacing, typography } from "../theme/tokens";

const tabs = ["Accueil", "Paiements", "Cartes", "Hub", "Profil"] as const;
type Tab = (typeof tabs)[number];

export function MainNavigation() {
  const [active, setActive] = useState<Tab>("Accueil");
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {active === "Accueil" ? <HomeScreen /> : <PlaceholderScreen title={active} />}
      </View>
      <View accessibilityRole="tablist" style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active === tab }}
            key={tab}
            onPress={() => {
              setActive(tab);
            }}
            style={styles.tab}
          >
            <Text style={[styles.tabText, active === tab && styles.active]}>{tab}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  content: { flex: 1 },
  tabs: { borderTopColor: colors.border, borderTopWidth: 1, flexDirection: "row", minHeight: 64 },
  tab: { alignItems: "center", flex: 1, justifyContent: "center", paddingHorizontal: spacing.xs },
  tabText: { color: colors.textMuted, fontSize: typography.caption },
  active: { color: colors.primary, fontWeight: "800" },
});
