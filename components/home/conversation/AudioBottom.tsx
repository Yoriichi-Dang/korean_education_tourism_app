import React from "react";
import { StyleSheet, View } from "react-native";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

const AudioBottom = () => {
  const { currentTrack, isPlaying, togglePlayPause, next, previous } =
    useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity onPress={previous} style={styles.controlButton}>
          <Ionicons
            name="play-skip-back"
            size={24}
            color={Colors.light.primary[300]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={48}
            color={Colors.light.primary[300]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={next} style={styles.controlButton}>
          <Ionicons
            name="play-skip-forward"
            size={24}
            color={Colors.light.primary[300]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioBottom;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "transparent",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    padding: 8,
  },
});
