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
    playlist,
    playAudio,
    pauseAudio,
    resumeAudio,
    nextAudio,
    previousAudio,
  } = useAudioPlayerStore();

  // Track current time and duration
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastPausedTime, setLastPausedTime] = useState(0);

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
      // Store the last paused time
      setLastPausedTime(currentTime);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, duration, currentTime]);

  // Play track
  const play = useCallback(
    (track: ConversationTrack) => {
      playAudio(track);
      setCurrentTime(0);
      setLastPausedTime(0);
    },
    [playAudio]
  );

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else if (currentConversation) {
      // Resume from last paused time
      resumeAudio();
      setCurrentTime(lastPausedTime);
    }
  }, [isPlaying, currentConversation, pauseAudio, resumeAudio, lastPausedTime]);

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
