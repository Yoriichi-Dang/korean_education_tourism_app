import { Colors } from "@/constants/Colors";
import { sampleConversations } from "@/data/seed";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { ConversationTrack } from "@/types/conversation";
import { formatDuration } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";
import { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const ConversationItem = memo(({ item }: { item: ConversationTrack }) => {
  const { currentTrack, isPlaying, play, pause } = useAudioPlayer();
  const router = useRouter();

  const isActive = currentTrack?.id === item.id;

  return (
    <TouchableOpacity
      style={[styles.conversationItem, isActive && styles.activeItem]}
      onPress={() => {
        router.push(`/(conversation)/${item.id}`);
      }}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
      <View style={styles.conversationInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        {item.artist && (
          <Text style={styles.artist} numberOfLines={1}>
            {item.artist}
          </Text>
        )}
        <View style={styles.metaInfo}>
          <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={(e) => {
          e.stopPropagation(); // Ngăn chặn sự kiện onPress của TouchableOpacity cha
          if (!currentTrack || currentTrack.id !== item.id) {
            play(item);
          }
          if (isActive && isPlaying) {
            pause();
          }
        }}
      >
        <Ionicons
          name={isActive && isPlaying ? "pause-circle" : "play-circle"}
          size={36}
          color={Colors.light.primary[300]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default ConversationItem;

const styles = StyleSheet.create({
  conversationItem: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 1,
    alignItems: "center",
  },
  activeItem: {
    backgroundColor: "#f0f8ff",
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.light.primary[400],
  },
  artist: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  metaInfo: {
    flexDirection: "row",
  },
  duration: {
    fontSize: 12,
    color: "#777",
    marginRight: 8,
  },
  timeAgo: {
    fontSize: 12,
    color: "#777",
  },
  playButton: {
    padding: 8,
  },
});
