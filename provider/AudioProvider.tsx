import { Audio, InterruptionModeIOS } from "expo-av";

import { useAudioPlayerStore } from "@/store/useAudioPlayerStore";
import { InterruptionModeAndroid } from "expo-av";
import { useEffect } from "react";

// Ví dụ với wrapper component bao bọc toàn bộ app
function AudioServiceProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Setup audio service once at app level
    const setupAudioService = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      });
    };

    setupAudioService();
  }, []);

  return children;
}

export default AudioServiceProvider;
