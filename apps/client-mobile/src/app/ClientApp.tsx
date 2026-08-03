import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ConnectionBanner } from "../components/ConnectionBanner";
import { MainNavigation } from "../navigation/MainNavigation";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { colors } from "../theme/tokens";

export function ClientApp() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ConnectionBanner state="online" />
        {onboardingComplete ? (
          <MainNavigation />
        ) : (
          <OnboardingScreen
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
