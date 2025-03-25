import { useCallback, useEffect } from "react";
import { ConversationTrack } from "@/types/conversation";
import { useAudioPlayerStore } from "@/store/useAudioPlayerStore";

/**
 * Custom hook for audio player functionality that wraps the Zustand store
 * to provide a cleaner interface and additional derived state
 */
export const useAudioPlayer = () => {
  // Get state and actions from the store
  const {
    currentConversation,
    isPlaying,
    isLoading,
    playlist,
    playAudio,
    pauseAudio,
    resumeAudio,
    stopAudio,
    addToPlaylist,
    removeFromPlaylist,
    nextAudio,
    previousAudio,
  } = useAudioPlayerStore();

  // Derived states
  const hasNext = useCallback(() => {
    if (!currentConversation || playlist.length <= 1) return false;
    const currentIndex = playlist.findIndex(
      (item) => item.id === currentConversation.id
    );
    return currentIndex < playlist.length - 1;
  }, [currentConversation, playlist]);

  const hasPrevious = useCallback(() => {
    if (!currentConversation || playlist.length <= 1) return false;
    const currentIndex = playlist.findIndex(
      (item) => item.id === currentConversation.id
    );
    return currentIndex > 0;
  }, [currentConversation, playlist]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else if (currentConversation) {
      resumeAudio();
    }
  }, [isPlaying, currentConversation, pauseAudio, resumeAudio]);

  // Play a track with optional auto-add to playlist
  const play = useCallback(
    (track: ConversationTrack, addToList: boolean = true) => {
      if (addToList && !playlist.some((item) => item.id === track.id)) {
        addToPlaylist(track);
      }
      playAudio(track);
    },
    [playAudio, addToPlaylist, playlist]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Optional: stop audio when component unmounts
      // Uncomment if you want this behavior
      // stopAudio();
    };
  }, []);

  return {
    // State
    currentTrack: currentConversation,
    isPlaying,
    isLoading,
    playlist,

    // Derived state
    hasNext: hasNext(),
    hasPrevious: hasPrevious(),

    // Actions
    play,
    pause: pauseAudio,
    resume: resumeAudio,
    stop: stopAudio,
    next: nextAudio,
    previous: previousAudio,
    togglePlayPause,
    addToPlaylist,
    removeFromPlaylist,
  };
};
