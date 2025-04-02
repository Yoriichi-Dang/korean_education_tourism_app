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
import { ConversationTrack } from "@/types/conversation";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useRouter } from "expo-router";

const Card = ({ item }: { item: ConversationTrack }) => {
  const router = useRouter();
  const { currentTrack, isPlaying, play, togglePlayPause, pause } =
    useAudioPlayer();
  const isActive = currentTrack?.id === item.id;

  return (
    <View style={styles.shadowContainer}>
      <Pressable
        onPress={() => {
          router.push(`/(conversation)/${item.id}`);
        }}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.artistText} numberOfLines={1}>
                  {item.artist}
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
