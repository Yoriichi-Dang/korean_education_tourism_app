import { create } from "zustand";
import {
  Audio,
  AVPlaybackSource,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { AudioPlayerState, ConversationTrack } from "@/types/conversation";
import { Platform } from "react-native";

// Hàm reset và khởi tạo lại audio session
const resetAudioSession = async () => {
  try {
    // Nếu đang trên iOS, thử reset session
    if (Platform.OS === "ios") {
      // Đầu tiên, đặt về trạng thái cơ bản
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: false,
        interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // Chờ một chút để hệ thống xử lý
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Sau đó thiết lập lại với cấu hình mong muốn
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.MixWithOthers, // MixWithOthers thường ít gây lỗi hơn
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
      });
    } else {
      // Cho Android, chỉ cần thiết lập bình thường
      await Audio.setAudioModeAsync({
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        shouldDuckAndroid: false,
      });
    }

    console.log("Audio session reset successfully");
    return true;
  } catch (error) {
    console.warn("Failed to reset audio session:", error);
    return false;
  }
};

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
  shouldDuckAndroid: true,
});

export const useAudioPlayerStore = create<AudioPlayerState>((set, get) => ({
  currentConversation: null,
  isPlaying: false,
  soundObject: null,
  playlist: [],
  isLoading: false,

  playAudio: async (conversation: ConversationTrack) => {
    try {
      set({ isLoading: true });

      // Reset audio session trước khi phát
      await resetAudioSession();

      // Nếu có sound object hiện tại, unload nó
      const { soundObject } = get();
      if (soundObject) {
        try {
          await soundObject.unloadAsync();
        } catch (e) {
          console.warn("Error unloading previous sound:", e);
        }
      }

      // Tạo sound object mới
      const { sound: newSoundObject } = await Audio.Sound.createAsync(
        conversation.url as any,
        { shouldPlay: false }, // Quan trọng: đặt shouldPlay: false
        (status) => {
          if (status.isLoaded && status.didJustFinish === true) {
            get().nextAudio();
          }
        }
      );

      // Cập nhật state
      set({
        currentConversation: conversation,
        soundObject: newSoundObject,
        isLoading: false,
      });

      // Phát sound sau khi đã setup xong
      await newSoundObject.playAsync();
      set({ isPlaying: true });
    } catch (error) {
      console.error("Error playing audio:", error);
      set({
        isLoading: false,
        isPlaying: false,
      });
    }
  },
  pauseAudio: async () => {
    const { soundObject } = get();
    if (soundObject) {
      await soundObject.pauseAsync();
      set({ isPlaying: false });
    }
  },

  resumeAudio: async () => {
    const { soundObject } = get();
    if (soundObject) {
      await soundObject.playAsync();
      set({ isPlaying: true });
    }
  },

  stopAudio: async () => {
    const { soundObject } = get();
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      set({
        currentConversation: null,
        isPlaying: false,
        soundObject: null,
      });
    }
  },

  addToPlaylist: (conversation: ConversationTrack) => {
    set((state) => ({
      playlist: [...state.playlist, conversation],
    }));
  },

  removeFromPlaylist: (conversationId: string) => {
    set((state) => ({
      playlist: state.playlist.filter((item) => item.id !== conversationId),
    }));
  },

  nextAudio: async () => {
    const { currentConversation, playlist } = get();
    if (!currentConversation || playlist.length === 0) return;

    // Find index of current conversation
    const currentIndex = playlist.findIndex(
      (item) => item.id === currentConversation.id
    );

    // If it's the last one or not found, go back to the first one
    const nextIndex =
      currentIndex === -1 || currentIndex === playlist.length - 1
        ? 0
        : currentIndex + 1;

    // Play next conversation
    await get().playAudio(playlist[nextIndex]);
  },

  previousAudio: async () => {
    const { currentConversation, playlist } = get();
    if (!currentConversation || playlist.length === 0) return;

    // Find index of current conversation
    const currentIndex = playlist.findIndex(
      (item) => item.id === currentConversation.id
    );

    // If it's the first one or not found, go to the last one
    const previousIndex =
      currentIndex === -1 || currentIndex === 0
        ? playlist.length - 1
        : currentIndex - 1;

    // Play previous conversation
    await get().playAudio(playlist[previousIndex]);
  },
}));
