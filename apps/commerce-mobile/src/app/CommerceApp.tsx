import { colors, ConnectionBanner } from "@mansa/mobile-ui";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CommerceNavigation } from "../navigation/CommerceNavigation";
import { CommerceOnboardingScreen } from "../screens/CommerceOnboardingScreen";

export function CommerceApp() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ConnectionBanner state="online" />
        {onboardingComplete ? (
          <CommerceNavigation />
        ) : (
          <CommerceOnboardingScreen
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
