import { colors, ConnectionBanner } from "@mansa/mobile-ui";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AgentNavigation } from "../navigation/AgentNavigation";
import { AgentOnboardingScreen } from "../screens/AgentOnboardingScreen";
export function AgentApp() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ConnectionBanner state="online" />
        {onboardingComplete ? (
          <AgentNavigation />
        ) : (
          <AgentOnboardingScreen
            onContinue={() => {
              setOnboardingComplete(true);
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({ safeArea: { backgroundColor: colors.background, flex: 1 } });
