import { useCallback, useEffect, useState } from "react";
import { useAudioPlayerStore } from "@/store/useAudioPlayerStore";
import { Conversation } from "@/types";
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
    addToPlaylist,
    removeFromPlaylist,
  } = useAudioPlayerStore();

  // Track current time and duration
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastPausedTime, setLastPausedTime] = useState(0);

  // Update duration when sound object changes or track changes
  useEffect(() => {
    if (soundObject && currentConversation) {
      const updateDuration = async () => {
        try {
          const status = await soundObject.getStatusAsync();
          if (status.isLoaded) {
            setDuration(
              status.durationMillis ? status.durationMillis / 1000 : 0
            );
          }
        } catch (error) {
          console.error("Error getting audio duration:", error);
        }
      };

      updateDuration();

      // Set up a listener for playback status updates
      const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
          // Update current time based on actual position
          setCurrentTime(status.positionMillis / 1000);

          // Make sure we have the duration
          if (status.durationMillis && duration === 0) {
            setDuration(status.durationMillis / 1000);
          }
        }
      };

      soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [soundObject, currentConversation]);

  // Clean up the timer when not playing
  useEffect(() => {
    if (!isPlaying && currentTime > 0) {
      // Store the last paused time
      setLastPausedTime(currentTime);
    }
  }, [isPlaying, currentTime]);

  // Play track
  const play = useCallback(
    (track: Conversation) => {
      playAudio(track);
      setCurrentTime(0);
      setLastPausedTime(0);
    },
    [playAudio]
  );

  const addToPlaylistAudio = useCallback(
    (track: Conversation) => {
      addToPlaylist(track);
    },
    [addToPlaylist]
  );

  const removeFromPlaylistAudio = useCallback(
    (conversationId: number) => {
      removeFromPlaylist(conversationId);
    },
    [removeFromPlaylist]
  );

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else if (currentConversation) {
      // Resume from last paused time
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
    currentConversation,
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
    addToPlaylistAudio,
    removeFromPlaylistAudio,
  };
};
