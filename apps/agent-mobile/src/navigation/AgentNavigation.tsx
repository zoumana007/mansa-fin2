import { colors, spacing, typography } from "@mansa/mobile-ui";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AgentDashboardScreen } from "../screens/AgentDashboardScreen";
import { AgentPlaceholderScreen } from "../screens/AgentPlaceholderScreen";
const tabs = ["Accueil", "Dépôt", "Retrait", "Caisse", "Activité"] as const;
type Tab = (typeof tabs)[number];
export function AgentNavigation() {
  const [active, setActive] = useState<Tab>("Accueil");
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {active === "Accueil" ? (
          <AgentDashboardScreen />
        ) : (
          <AgentPlaceholderScreen title={active} />
        )}
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
