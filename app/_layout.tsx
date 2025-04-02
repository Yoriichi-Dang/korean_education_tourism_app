import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import Fonts from "@/constants/Fonts";
import AppNavigator from "@/navigation/AppNavigator";
import AuthProvider from "@/providers/AuthProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SigniKa: Fonts.SigniKaFont.Regular.path,
    SigniKaBold: Fonts.SigniKaFont.Bold.path,
    SigniKaLight: Fonts.SigniKaFont.Light.path,
    SigniKaSemiBold: Fonts.SigniKaFont.SemiBold.path,
    SigniKaMedium: Fonts.SigniKaFont.Medium.path,
    NanumGothic: Fonts.NanumGothicFont.Regular.path,
    NanumGothicBold: Fonts.NanumGothicFont.Bold.path,
    NanumGothicExtraBold: Fonts.NanumGothicFont.ExtraBold.path,
    EBGaramond: Fonts.EBGaramondFont.Regular.path,
    EBGaramondBold: Fonts.EBGaramondFont.Bold.path,
    EBGaramondMedium: Fonts.EBGaramondFont.Medium.path,
    EBGaramondSemiBold: Fonts.EBGaramondFont.SemiBold.path,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
