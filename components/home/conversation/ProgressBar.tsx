import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const ProgressBar = ({ id }: { id: number }) => {
  const {
    currentConversation,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    resume,
    lastPausedTime,
  } = useAudioPlayer();

  // Thêm React state để theo dõi isActive
  const [isActiveTrack, setIsActiveTrack] = useState(false);
  // Thêm state để theo dõi trạng thái trước khi kéo
  const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);
  // Thêm state để theo dõi isDragging
  const [isDraggingState, setIsDraggingState] = useState(false);

  const progress = useSharedValue(0);
  const isDragging = useSharedValue(false);

  // Theo dõi thay đổi của isDragging.value và cập nhật state
  useAnimatedReaction(
    () => isDragging.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        runOnJS(setIsDraggingState)(currentValue);
      }
    }
  );

  // Cập nhật isActiveTrack bằng React state thay vì đọc trực tiếp trong render
  useEffect(() => {
    setIsActiveTrack(currentConversation?.conversation_id === id);
  }, [currentConversation?.conversation_id, id]);

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Lưu giá trị currentTime và duration vào React state
  const [displayTime, setDisplayTime] = useState(0);
  const [displayDuration, setDisplayDuration] = useState(0);

  useEffect(() => {
    if (isActiveTrack) {
      setDisplayTime(currentTime);
      setDisplayDuration(duration);
    }
  }, [currentTime, duration, isActiveTrack]);

  // Update progress value when current time or duration changes, but only if this track is active
  // Sửa lại, sử dụng isDraggingState thay vì isDragging.value
  useEffect(() => {
    if (isActiveTrack && displayDuration > 0 && !isDraggingState) {
      progress.value = withTiming(displayTime / displayDuration, {
        duration: 100,
      });
    }
  }, [displayTime, displayDuration, isActiveTrack, isDraggingState]);

  // Handle play/pause state
  useEffect(() => {
    if (!isActiveTrack) {
      cancelAnimation(progress);
    }
  }, [isActiveTrack, progress]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  // Pan gesture for seeking - sửa để giữ trạng thái phát đúng
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
      // Lưu trạng thái phát hiện tại trước khi kéo
      setWasPlayingBeforeDrag(isPlaying);

      if (isPlaying && isActiveTrack) {
        runOnJS(pause)();
      }
    })
    .onUpdate((event) => {
      const newProgress = Math.max(
        0,
        Math.min(1, event.translationX / (Dimensions.get("window").width - 40))
      );
      progress.value = newProgress;
    })
    .onEnd(() => {
      isDragging.value = false;

      if (currentConversation && isActiveTrack) {
        // Tính toán vị trí thời gian mới dựa trên progress và thiết lập vị trí phát
        const newPositionTime = progress.value * displayDuration;

        // Cập nhật thời gian hiện tại
        runOnJS(setDisplayTime)(newPositionTime);

        // Hiệu chỉnh lại currentTime dựa trên vị trí kéo
        if (wasPlayingBeforeDrag) {
          // Nếu đang phát trước khi kéo, tiếp tục phát từ vị trí mới
          runOnJS(play)(currentConversation);
        } else {
          // Nếu không phát trước khi kéo, chỉ cập nhật vị trí nhưng không phát
          // Không cần gọi gì cả, vì pause đã giữ vị trí hiện tại
        }
      }
    });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Pressable style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progress, progressStyle]} />
          </View>
        </Pressable>
      </GestureDetector>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {isActiveTrack ? formatTime(displayTime) : "0:00"}
        </Text>
        <Text style={styles.timeText}>
          {isActiveTrack ? formatTime(displayDuration) : "0:00"}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    width: "100%",
    height: "100%",
  },
  progress: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
  },
});
