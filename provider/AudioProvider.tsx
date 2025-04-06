import { Audio, InterruptionModeIOS } from "expo-av";

import { useAudioPlayerStore } from "@/store/useAudioPlayerStore";
import { InterruptionModeAndroid } from "expo-av";
import { useEffect, useCallback } from "react";

// Ví dụ với wrapper component bao bọc toàn bộ app
function AudioServiceProvider({ children }: { children: React.ReactNode }) {
  // Setup audio service khi app khởi động
  const setupAudioService = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix, // Thay đổi thành MixWithOthers để tránh ngắt audio
      });

      console.log("Audio service initialized");
    } catch (error) {
      console.error("Failed to initialize audio service:", error);
    }
  }, []);

  useEffect(() => {
    setupAudioService();

    // Thêm sự kiện lắng nghe khi app chuyển background/foreground
    const subscription = Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true, // Đảm bảo audio tiếp tục trong background
    });

    return () => {
      // Chỉ clean up khi app unmount hoàn toàn
      const { soundObject, isPlaying } = useAudioPlayerStore.getState();
      // Chỉ dừng audio nếu không đang phát
      if (soundObject && !isPlaying) {
        soundObject.unloadAsync();
      }
    };
  }, [setupAudioService]);

  return children;
}

export default AudioServiceProvider;
