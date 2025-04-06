import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Conversation } from "@/types";
const AudioBottom = ({ item }: { item: Conversation }) => {
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
    currentConversation?.conversation_id === item.conversation_id && isPlaying;
  console.log(isActive);
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        {/* <TouchableOpacity style={styles.controlButton}>
          <MaterialCommunityIcons name="shuffle" size={30} color="gray" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={previous} style={styles.controlButton}>
          <Ionicons
            name="play-skip-back"
            size={40}
            color={Colors.light.black}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            if (isActive) {
              togglePlayPause();
            } else {
              pause();
              play(item);
            }
          }}
          style={styles.playButton}
        >
          <Ionicons
            name={isActive ? "pause-circle" : "play-circle"}
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
        {/* <TouchableOpacity style={styles.controlButton}>
          <MaterialCommunityIcons name="repeat" size={30} color="gray" />
        </TouchableOpacity> */}
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
