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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AudioServiceProvider from "@/provider/AudioProvider";
import { createContext } from "react";
import { useVocabularyAudio } from "@/hooks/useVocabularyAudio";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

// Tạo context cho Vocabulary Audio
export const VocabularyAudioContext = createContext<ReturnType<
  typeof useVocabularyAudio
> | null>(null);

// Vocabulary Audio Provider
function VocabularyAudioProvider({ children }: { children: React.ReactNode }) {
  const audioHook = useVocabularyAudio();

  return (
    <VocabularyAudioContext.Provider value={audioHook}>
      {children}
    </VocabularyAudioContext.Provider>
  );
}

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
          <QueryClientProvider client={queryClient}>
            <AudioServiceProvider>
              <VocabularyAudioProvider>
                <AppNavigator />
                <StatusBar style="auto" />
              </VocabularyAudioProvider>
            </AudioServiceProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
