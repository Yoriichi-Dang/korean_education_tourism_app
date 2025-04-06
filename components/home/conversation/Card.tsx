import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useRouter } from "expo-router";
import { Conversation } from "@/types";

const Card = ({ item }: { item: Conversation }) => {
  const router = useRouter();
  const {
    currentConversation,
    isPlaying,
    play,
    togglePlayPause,
    pause,
    addToPlaylistAudio,
  } = useAudioPlayer();
  const isActive =
    currentConversation?.conversation_id === item.conversation_id;

  return (
    <View style={styles.shadowContainer}>
      <Pressable
        onPress={() => {
          router.push(`/(conversation)/${item.conversation_id}`);
        }}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: item.image_url as string }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText} numberOfLines={1}>
                  {item.title_ko}
                </Text>
                <Text style={styles.artistText} numberOfLines={1}>
                  {item.title_vi}
                </Text>
              </View>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  if (isActive) {
                    togglePlayPause();
                  } else {
                    pause();
                    play(item);
                    addToPlaylistAudio(item);
                  }
                }}
                style={styles.playButton}
              >
                <Ionicons
                  name={isActive && isPlaying ? "pause-circle" : "play-circle"}
                  size={43}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  shadowContainer: {
    // Container for shadow
    width: 250,
    height: 250,
    marginRight: 20,
    // Shadow props for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 10,
    backgroundColor: "black", // Add this line
    borderRadius: 20, // Match the inner container's borderRadius
  },
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "black",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 12,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  artistText: {
    color: "white",
    fontSize: 14,
  },
  playButton: {
    padding: 8,
  },
});
