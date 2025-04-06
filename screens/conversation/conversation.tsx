import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import LeftChevron from "@/components/icons/LeftChevron";
import DotMore from "@/components/icons/DotMore";
import ProgressBar from "@/components/home/conversation/ProgressBar";
import AudioBottom from "@/components/home/conversation/AudioBottom";
import BottomOverlay from "@/components/home/conversation/BottomOverlay";
import { getConversationWithVocabulary } from "@/services/conversation-service";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

const ConversationScreen = ({ id }: { id: number }) => {
  const { currentConversation, isPlaying, play, resume, togglePlayPause } =
    useAudioPlayer();
  const router = useRouter();

  // Lấy params từ route
  const params = useLocalSearchParams();
  const keepAudio = params.keepAudio === "true";
  const shouldPlay = params.playing === "true";

  const isActive = currentConversation?.conversation_id === id;

  const { data, isLoading } = useQuery({
    queryKey: ["conversations", id],
    queryFn: () => getConversationWithVocabulary(id),
  });

  // Custom back handler để giữ audio tiếp tục phát khi back
  const handleCustomBack = () => {
    // Chuyển về trang conversation với tham số giữ trạng thái audio
    router.push({
      pathname: "/(tabs)/conversation",
      params: {
        keepAudio: "true",
        playing: isPlaying ? "true" : "false",
      },
    });
  };

  // Xử lý audio khi màn hình được load
  useEffect(() => {
    if (data && !isLoading) {
      // Nếu keepAudio=true và item đang active, giữ nguyên trạng thái
      if (keepAudio && isActive) {
        // Nếu shouldPlay=true nhưng hiện tại không phát, tiếp tục phát
        if (shouldPlay && !isPlaying) {
          resume();
        }
      }
      // Nếu không phải item active hoặc không có keepAudio, và không có currentConversation
      else if (!currentConversation) {
        // Tự động phát item này
        play(data);
      }
    }
  }, [
    data,
    isLoading,
    isActive,
    keepAudio,
    shouldPlay,
    isPlaying,
    play,
    resume,
    currentConversation,
  ]);

  if (isLoading) return <ActivityIndicator />;
  if (!data) return null;

  return (
    <BackgroundLayout>
      <View style={styles.header}>
        {/* Sử dụng custom back button thay vì BackButton component */}
        <TouchableOpacity onPress={handleCustomBack} style={styles.backButton}>
          <LeftChevron width={24} height={24} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            {isActive && isPlaying ? "Now Playing" : "Conversation"}
          </Text>
        </View>
        <DotMore width={24} height={24} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data?.image_url || "" }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{data?.title_ko}</Text>
      </View>
      <ProgressBar id={id} />
      <AudioBottom
        item={data}
        handlePlayPause={() => {
          if (isActive) {
            togglePlayPause();
          } else {
            play(data);
          }
        }}
      />
      <BottomOverlay item={data} />
    </BackgroundLayout>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5, // Tăng vùng nhấn
  },
  titleContainer: {
    alignItems: "center",
    gap: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  imageContainer: {
    padding: 16,
    width: "100%",
    overflow: "hidden",
    borderRadius: 30,
    height: 450,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  contentTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 12,
  },
  contentArtist: {
    fontSize: 16,
    color: "gray",
  },
});
