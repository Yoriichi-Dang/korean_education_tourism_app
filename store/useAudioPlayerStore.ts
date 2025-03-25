import { create } from "zustand";
import { Audio, AVPlaybackSource } from "expo-av";
import { AudioPlayerState, ConversationTrack } from "@/types/conversation";

// Initialize Audio
Audio.setAudioModeAsync({
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

      // If currently playing a song, stop it first
      const { soundObject } = get();
      if (soundObject) {
        await soundObject.unloadAsync();
      }
      // Create and load new sound object
      const { sound: newSoundObject } = await Audio.Sound.createAsync(
        conversation.url as any,
        { shouldPlay: true },
        (status) => {
          // Callback when playback status changes
          if (status.isLoaded && status.didJustFinish === true) {
            // Automatically play next song when current one finishes
            get().nextAudio();
          }
        }
      );

      // Update state
      set({
        currentConversation: conversation,
        isPlaying: true,
        soundObject: newSoundObject,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
      set({ isLoading: false });
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
