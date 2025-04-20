import { Colors } from "@/constants/Colors";
import { sampleConversations } from "@/data/seed";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { formatDuration } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Conversation } from "@/types";

const ConversationItem = memo(({ item }: { item: Conversation }) => {
  const {
    currentConversation,
    isPlaying,
    togglePlayPause,
    play,
    addToPlaylistAudio,
  } = useAudioPlayer();
  const router = useRouter();

  const isCurrentTrack =
    currentConversation?.conversation_id === item.conversation_id;

  // Xử lý việc di chuyển đến trang chi tiết
  const handleNavigation = useCallback(() => {
    router.push({
      pathname: `/(conversation)/${item.conversation_id}`,
      params: {
        keepAudio: "true",
        playing: isCurrentTrack && isPlaying ? "true" : "false",
      },
    });
  }, [router, item, isCurrentTrack, isPlaying]);

  // Xử lý nhấn nút play/pause
  const handlePlayPause = (e: any) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      if (item.audio_url) {
        play(item);
        addToPlaylistAudio(item);
      } else {
        Alert.alert("Không có audio", "Không có audio để phát");
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.conversationItem, isCurrentTrack && styles.activeItem]}
      onPress={handleNavigation}
    >
      <Image
        source={{ uri: item.image_url as string }}
        style={styles.thumbnail}
      />
      <View style={styles.conversationInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title_ko}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {item.title_vi}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlayPause}
        activeOpacity={0.6}
      >
        <Ionicons
          name={isCurrentTrack && isPlaying ? "pause-circle" : "play-circle"}
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
