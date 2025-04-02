import { useCallback, useEffect, useState } from "react";
import { ConversationTrack } from "@/types/conversation";
import { useAudioPlayerStore } from "@/store/useAudioPlayerStore";

/**
 * Custom hook for audio player functionality that wraps the Zustand store
 * to provide a cleaner interface and additional derived state
 */
export const useAudioPlayer = () => {
  const {
    currentConversation,
    isPlaying,
    soundObject,
    playAudio,
    pauseAudio,
    resumeAudio,
    nextAudio,
    previousAudio,
  } = useAudioPlayerStore();

  // Track current time and duration
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update duration when track changes
  useEffect(() => {
    if (currentConversation) {
      setDuration(currentConversation.duration);
    }
  }, [currentConversation]);

  // Update current time when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setCurrentTime(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, duration]);

  // Play track
  const play = useCallback(
    (track: ConversationTrack) => {
      playAudio(track);
    },
    [playAudio]
  );

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else if (currentConversation) {
      resumeAudio();
    }
  }, [isPlaying, currentConversation, pauseAudio, resumeAudio]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [soundObject]);

  return {
    // State
    currentTrack: currentConversation,
    isPlaying,
    currentTime,
    duration,

    // Actions
    play,
    pause: pauseAudio,
    resume: resumeAudio,
    next: nextAudio,
    previous: previousAudio,
    togglePlayPause,
  };
};
