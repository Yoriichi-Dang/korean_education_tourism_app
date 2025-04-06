import React, { useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Conversation } from "@/types";

const AudioBottom = ({
  item,
  handlePlayPause,
}: {
  item: Conversation;
  handlePlayPause: () => void;
}) => {
  const {
    currentConversation,
    isPlaying,
    togglePlayPause,
    next,
    play,
    previous,
    pause,
  } = useAudioPlayer();
  const isActive =
    currentConversation?.conversation_id === item.conversation_id;
  // Chỉ kiểm tra xem item này có phải là item hiện tại không
  const isCurrentTrack =
    currentConversation?.conversation_id === item.conversation_id;

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity onPress={previous} style={styles.controlButton}>
          <Ionicons
            name="play-skip-back"
            size={40}
            color={Colors.light.black}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.playButton}
          activeOpacity={0.6}
        >
          <Ionicons
            name={isCurrentTrack && isPlaying ? "pause-circle" : "play-circle"}
            size={70}
            color={Colors.light.black}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={next} style={styles.controlButton}>
          <Ionicons
            name="play-skip-forward"
            size={40}
            color={Colors.light.black}
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
    gap: 25,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    padding: 8,
  },
});
