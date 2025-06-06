import React from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
const BottomTrack = () => {
  const { currentConversation, togglePlayPause, isPlaying } = useAudioPlayer();
  const router = useRouter();
  if (!currentConversation) return null;
  return (
    <TouchableOpacity
      style={styles.bottomPlayer}
      onPress={() => {
        router.push(`/(conversation)/${currentConversation.conversation_id}`);
      }}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: currentConversation.image_url || "" }}
        style={styles.playerThumbnail}
      />
      <View style={styles.playerInfo}>
        <Text style={styles.playerTitle} numberOfLines={1}>
          {currentConversation.title_ko}
        </Text>
        {currentConversation.title_vi && (
          <Text style={styles.playerArtist} numberOfLines={1}>
            {currentConversation.title_vi}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.playerControl}
        onPress={(e) => {
          e.stopPropagation();
          togglePlayPause();
        }}
      >
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={40}
          color={Colors.light.primary[300]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default BottomTrack;

const styles = StyleSheet.create({
  bottomPlayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 8,
  },
  playerThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  playerTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  playerArtist: {
    fontSize: 13,
    color: "#555",
  },
  playerControl: {
    padding: 8,
  },
});
