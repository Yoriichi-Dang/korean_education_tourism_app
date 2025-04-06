import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { useState, useCallback, useEffect } from "react";

export const useVocabularyAudio = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Tạo và cấu hình audio session khi mount
  useEffect(() => {
    const setupAudioSession = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          // Sử dụng MixWithOthers giúp âm thanh không bị ngắt khi chuyển màn hình
          interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });
      } catch (error) {
        console.warn("Error setting audio mode:", error);
      }
    };

    setupAudioSession();
  }, []);

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Hàm dừng âm thanh đang phát
  const stopAudio = useCallback(async () => {
    if (sound) {
      try {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
      } catch (error) {
        console.warn("Error stopping audio:", error);
      } finally {
        setSound(null);
        setIsPlaying(false);
        setCurrentAudioUrl(null);
      }
    }
  }, [sound]);

  // Hàm phát âm thanh từ vựng
  const playVocabularyAudio = useCallback(
    async (audioUrl: string) => {
      if (!audioUrl) {
        console.warn("No audio URL provided");
        return;
      }

      try {
        setIsLoading(true);

        // Luôn dừng audio hiện tại trước khi phát mới
        if (sound) {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              await sound.unloadAsync();
            }
          } catch (e) {
            // Bỏ qua lỗi nếu sound không hợp lệ
          }
          setSound(null);
        }

        // Tạo sound object mới
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false } // Tạo nhưng chưa phát
        );

        // Thiết lập lại các state
        setSound(newSound);
        setCurrentAudioUrl(audioUrl);

        // Chỉ phát khi đã load xong
        await newSound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing vocabulary audio:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [] // Không phụ thuộc vào sound để tránh vòng lặp khi sound thay đổi
  );

  return {
    playVocabularyAudio,
    stopAudio,
    isPlaying,
    isLoading,
    currentAudioUrl,
  };
};
