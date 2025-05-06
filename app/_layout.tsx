import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import Fonts from "@/constants/Fonts";
import AppNavigator from "@/navigation/AppNavigator";
import AuthProvider from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";
import { useVocabularyAudio } from "@/hooks/useVocabularyAudio";

// Giữ splash screen hiển thị cho đến khi chúng ta chủ động ẩn nó
SplashScreen.preventAutoHideAsync().catch((err) => {
  console.warn("Error keeping splash screen:", err);
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [error, setError] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  // Load tất cả font cần thiết
  const [fontsLoaded, fontError] = useFonts({
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
    Inter: Fonts.Inter.Regular.path,
    InterMedium: Fonts.Inter.Medium.path,
    InterSemiBold: Fonts.Inter.SemiBold.path,
    InterBold: Fonts.Inter.Bold.path,
  });

  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
      setError("Failed to load fonts. Please restart the app.");
    }
  }, [fontError]);

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn("Error preparing app:", e);
        setError("Error preparing app. Please try again.");
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Error hiding splash screen:", e);
      }
    }
  }, [appIsReady]);

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "red",
            fontSize: 16,
            textAlign: "center",
            padding: 20,
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  // Nếu ứng dụng chưa sẵn sàng, render container trống
  // Splash screen vẫn hiển thị ở trên nhờ preventAutoHideAsync
  if (!appIsReady) {
    return null;
  }

  // Render ứng dụng khi mọi thứ đã sẵn sàng
  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={onLayoutRootView} // Chỉ ẩn splash khi layout đã hoàn thành
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppNavigator />
            <StatusBar style="auto" />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
