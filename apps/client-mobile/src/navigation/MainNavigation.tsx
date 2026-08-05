import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  CardsExperienceScreen,
  HomeExperienceScreen,
  HubExperienceScreen,
  PaymentsExperienceScreen,
  ProfileExperienceScreen,
} from "../screens/ClientExperienceScreens";
import { colors, spacing } from "../theme/tokens";

const tabs = [
  { icon: "⌂", label: "Accueil" },
  { icon: "↕", label: "Paiements" },
  { icon: "▰", label: "Cartes" },
  { icon: "◈", label: "Hub" },
  { icon: "○", label: "Profil" },
] as const;

type Tab = (typeof tabs)[number]["label"];

function ActiveScreen({ active }: { active: Tab }) {
  if (active === "Paiements") return <PaymentsExperienceScreen />;
  if (active === "Cartes") return <CardsExperienceScreen />;
  if (active === "Hub") return <HubExperienceScreen />;
  if (active === "Profil") return <ProfileExperienceScreen />;
  return <HomeExperienceScreen />;
}

export function MainNavigation() {
  const [active, setActive] = useState<Tab>("Accueil");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActiveScreen active={active} />
      </View>
      <View accessibilityRole="tablist" style={styles.tabs}>
        {tabs.map((tab) => {
          const selected = active === tab.label;
          return (
            <Pressable
              accessibilityLabel={tab.label}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              key={tab.label}
              onPress={() => {
                setActive(tab.label);
              }}
              style={styles.tab}
            >
              <View style={[styles.iconWrap, selected && styles.iconWrapActive]}>
                <Text style={[styles.tabIcon, selected && styles.tabIconActive]}>{tab.icon}</Text>
              </View>
              <Text style={[styles.tabText, selected && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  content: { flex: 1 },
  tabs: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    left: 0,
    minHeight: 78,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
    position: "absolute",
    right: 0,
  },
  tab: { alignItems: "center", flex: 1, gap: 3, justifyContent: "center" },
  iconWrap: {
    alignItems: "center",
    borderRadius: 14,
    height: 31,
    justifyContent: "center",
    width: 42,
  },
  iconWrapActive: { backgroundColor: "rgba(31,180,105,0.12)" },
  tabIcon: { color: colors.textMuted, fontSize: 18, fontWeight: "800" },
  tabIconActive: { color: colors.primary },
  tabText: { color: colors.textMuted, fontSize: 9, fontWeight: "700" },
  tabTextActive: { color: colors.primary, fontWeight: "900" },
});
