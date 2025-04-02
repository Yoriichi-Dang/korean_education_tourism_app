import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  cancelAnimation,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const ProgressBar = () => {
  const { currentTrack, isPlaying, currentTime, duration, play, pause } =
    useAudioPlayer();
  const progress = useSharedValue(0);
  const isDragging = useSharedValue(false);

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Update progress value when current time or duration changes
  React.useEffect(() => {
    if (duration > 0 && !isDragging.value) {
      progress.value = withTiming(currentTime / duration, {
        duration: 1000,
      });
    }
  }, [currentTime, duration]);

  // Handle play/pause state
  React.useEffect(() => {
    if (!isPlaying) {
      cancelAnimation(progress);
    }
  }, [isPlaying]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  // Pan gesture for seeking
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
      if (isPlaying) {
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
    .onEnd((event) => {
      isDragging.value = false;
      if (isPlaying) {
        runOnJS(play)(currentTrack!);
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
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
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
