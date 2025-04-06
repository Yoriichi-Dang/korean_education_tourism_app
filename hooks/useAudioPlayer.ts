import { useCallback, useEffect, useState, useRef } from "react";
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
  } = useAudioPlayerStore();

  // Track current time and duration
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastPausedTime, setLastPausedTime] = useState(0);

  // Sử dụng useRef để theo dõi thao tác đang thực hiện
  const isPerformingActionRef = useRef(false);

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

  // Play track - đảm bảo chỉ một thao tác được thực hiện tại một thời điểm
  const play = useCallback(
    async (track: Conversation) => {
      // Nếu đang thực hiện thao tác khác, bỏ qua
      if (isPerformingActionRef.current) return;

      try {
        isPerformingActionRef.current = true;
        console.log("Playing track:", track.title_ko);
        await playAudio(track);
        setCurrentTime(0);
        setLastPausedTime(0);
      } finally {
        // Đảm bảo reset flag khi hoàn thành
        setTimeout(() => {
          isPerformingActionRef.current = false;
        }, 300);
      }
    },
    [playAudio]
  );

  // Pause audio - đảm bảo chỉ một thao tác được thực hiện tại một thời điểm
  const pause = useCallback(async () => {
    // Nếu đang thực hiện thao tác khác hoặc không đang phát, bỏ qua
    if (isPerformingActionRef.current || !isPlaying) return;

    try {
      isPerformingActionRef.current = true;
      console.log("Pausing audio...");
      await pauseAudio();
    } finally {
      // Đảm bảo reset flag khi hoàn thành
      setTimeout(() => {
        isPerformingActionRef.current = false;
      }, 300);
    }
  }, [pauseAudio, isPlaying]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play(currentConversation as Conversation);
    }
  }, [isPlaying, currentConversation, play, pause]);
  // Resume audio - đảm bảo chỉ một thao tác được thực hiện tại một thời điểm
  const resume = useCallback(async () => {
    // Nếu đang thực hiện thao tác khác hoặc đang phát, bỏ qua
    if (isPerformingActionRef.current || isPlaying) return;

    try {
      isPerformingActionRef.current = true;
      console.log("Resuming audio...");
      if (currentConversation) {
        await resumeAudio();
      }
    } finally {
      // Đảm bảo reset flag khi hoàn thành
      setTimeout(() => {
        isPerformingActionRef.current = false;
      }, 300);
    }
  }, [resumeAudio, currentConversation, isPlaying]);

  const addToPlaylistAudio = useCallback(
    (track: Conversation) => {
      addToPlaylist(track);
    },
    [addToPlaylist]
  );

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
    pause,
    resume,
    next: nextAudio,
    previous: previousAudio,
    togglePlayPause,
    addToPlaylistAudio,
  };
};
