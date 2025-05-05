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

  // Thêm ref để theo dõi component mounted state
  const isMountedRef = useRef(true);

  // Set isMounted to true when component mounts and false when it unmounts
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      // Reset action flag on unmount to prevent stale state
      isPerformingActionRef.current = false;
    };
  }, []);

  // Function để reset trạng thái action flag an toàn
  const safelyResetActionFlag = useCallback(() => {
    if (isMountedRef.current) {
      isPerformingActionRef.current = false;
    }
  }, []);

  // Update duration when sound object changes or track changes
  useEffect(() => {
    if (soundObject && currentConversation) {
      const updateDuration = async () => {
        try {
          const status = await soundObject.getStatusAsync();
          if (status.isLoaded && isMountedRef.current) {
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
      const onPlaybackStatusUpdate = async (status: any) => {
        if (status.isLoaded && isMountedRef.current) {
          // Update current time based on actual position
          setCurrentTime(status.positionMillis / 1000);

          // Make sure we have the duration
          if (status.durationMillis && duration === 0) {
            setDuration(status.durationMillis / 1000);
          }

          // Kiểm tra nếu track đã phát hết
          if (status.didJustFinish && isMountedRef.current) {
            console.log("Track finished, resetting to beginning");
            try {
              // Đặt lại vị trí về đầu
              await soundObject.setPositionAsync(0);
              await pauseAudio();

              if (isMountedRef.current) {
                setCurrentTime(0);
                setLastPausedTime(0);
              }
            } catch (error) {
              console.error("Error resetting track:", error);
            }
          }
        }
      };

      soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [soundObject, currentConversation, duration, pauseAudio]);

  // Clean up the timer when not playing
  useEffect(() => {
    if (!isPlaying && currentTime > 0 && isMountedRef.current) {
      // Store the last paused time
      setLastPausedTime(currentTime);
    }
  }, [isPlaying, currentTime]);

  // Play track - sửa đổi để tôn trọng vị trí hiện tại khi resume
  const play = useCallback(
    async (track: Conversation) => {
      // Kiểm tra component có mounted và không có action đang chạy
      if (!isMountedRef.current || isPerformingActionRef.current) return;

      try {
        isPerformingActionRef.current = true;
        console.log("Playing track:", track.title_ko);

        // Kiểm tra xem có phải là track hiện tại và đã được pause
        const isCurrentTrack =
          currentConversation?.conversation_id === track.conversation_id;

        if (isCurrentTrack && lastPausedTime > 0 && soundObject) {
          // Nếu là track hiện tại và đã pause trước đó, sử dụng resumeAudio
          await resumeAudio();
        } else {
          // Nếu là track mới hoặc chưa từng pause, phát từ đầu
          await playAudio(track);
          if (isMountedRef.current) {
            setCurrentTime(0);
            setLastPausedTime(0);
          }
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      } finally {
        // Đảm bảo reset flag khi hoàn thành
        setTimeout(safelyResetActionFlag, 300);
      }
    },
    [
      playAudio,
      resumeAudio,
      currentConversation,
      lastPausedTime,
      soundObject,
      safelyResetActionFlag,
    ]
  );

  // Pause audio - sửa lại logic với các kiểm tra an toàn hơn
  const pause = useCallback(async () => {
    // Kiểm tra nếu component mounted, đang phát và không có action đang chạy
    if (!isMountedRef.current || !isPlaying || isPerformingActionRef.current)
      return;

    try {
      isPerformingActionRef.current = true;
      console.log("Pausing audio at:", currentTime);

      // Lưu vị trí hiện tại trước khi pause
      if (isMountedRef.current) {
        setLastPausedTime(currentTime);
      }

      // Đảm bảo soundObject tồn tại trước khi gọi pauseAudio
      if (soundObject) {
        await pauseAudio();
      }
    } catch (error) {
      console.error("Error pausing audio:", error);
    } finally {
      // Đảm bảo reset flag khi hoàn thành
      setTimeout(safelyResetActionFlag, 300);
    }
  }, [pauseAudio, isPlaying, soundObject, currentTime, safelyResetActionFlag]);

  const togglePlayPause = useCallback(() => {
    // Kiểm tra component có mounted
    if (!isMountedRef.current) return;

    if (isPlaying) {
      pause();
    } else if (currentConversation) {
      // Gọi play với currentConversation
      play(currentConversation as Conversation);
    }
  }, [isPlaying, currentConversation, play, pause]);

  // Resume audio - cập nhật để sử dụng lastPausedTime
  const resume = useCallback(async () => {
    // Kiểm tra component có mounted, không đang phát và không có action đang chạy
    if (!isMountedRef.current || isPlaying || isPerformingActionRef.current)
      return;

    try {
      isPerformingActionRef.current = true;
      console.log("Resuming audio from:", lastPausedTime);

      if (currentConversation && soundObject) {
        // Sử dụng lastPausedTime để định vị lại
        if (lastPausedTime > 0) {
          await soundObject.setPositionAsync(lastPausedTime * 1000);
        }
        await resumeAudio();
      }
    } catch (error) {
      console.error("Error resuming audio:", error);
    } finally {
      // Đảm bảo reset flag khi hoàn thành
      setTimeout(safelyResetActionFlag, 300);
    }
  }, [
    resumeAudio,
    currentConversation,
    isPlaying,
    soundObject,
    lastPausedTime,
    safelyResetActionFlag,
  ]);

  // Thêm hàm để reset track về đầu
  const resetTrack = useCallback(async () => {
    if (!isMountedRef.current || isPerformingActionRef.current || !soundObject)
      return;

    try {
      isPerformingActionRef.current = true;

      // Dừng phát nếu đang phát
      if (isPlaying) {
        await pauseAudio();
      }

      // Đặt lại vị trí về đầu
      await soundObject.setPositionAsync(0);

      if (isMountedRef.current) {
        setCurrentTime(0);
        setLastPausedTime(0);
      }
    } catch (error) {
      console.error("Error resetting track:", error);
    } finally {
      setTimeout(safelyResetActionFlag, 300);
    }
  }, [soundObject, isPlaying, pauseAudio, safelyResetActionFlag]);

  const addToPlaylistAudio = useCallback(
    (track: Conversation) => {
      if (isMountedRef.current) {
        addToPlaylist(track);
      }
    },
    [addToPlaylist]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (soundObject) {
        // Unload audio khi component unmount
        soundObject
          .unloadAsync()
          .catch((err) => console.error("Error unloading audio:", err));
      }
    };
  }, [soundObject]);

  return {
    // State
    currentConversation,
    isPlaying,
    currentTime,
    duration,
    lastPausedTime,

    // Actions
    play,
    pause,
    resume,
    resetTrack,
    next: nextAudio,
    previous: previousAudio,
    togglePlayPause,
    addToPlaylistAudio,
  };
};
