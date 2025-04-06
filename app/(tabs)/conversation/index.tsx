import React, { useEffect } from "react";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { TopConversationList } from "@/components/home/conversation/TopConversationList";
import ConversationList from "@/components/home/conversation/ConversationList";
import { StyleSheet, Text, View } from "react-native";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useLocalSearchParams } from "expo-router";
import BottomTrack from "@/components/home/conversation/BottomTrack";

const Page = () => {
  const { currentConversation, isPlaying, resume } = useAudioPlayer();
  const params = useLocalSearchParams();

  // Lấy tham số từ navigation
  const keepAudio = params.keepAudio === "true";
  const shouldPlay = params.playing === "true";

  // Xử lý audio khi quay lại màn hình
  useEffect(() => {
    // Nếu yêu cầu giữ audio và có track hiện tại, kiểm tra trạng thái
    if (keepAudio && currentConversation) {
      // Nếu cần tiếp tục phát mà hiện không phát, tiếp tục phát
      if (shouldPlay && !isPlaying) {
        resume();
      }
    }
  }, [keepAudio, shouldPlay, currentConversation, isPlaying, resume]);

  // Tính toán padding bottom để tránh BottomTrack che nội dung nếu có audio đang phát
  const bottomPadding = currentConversation ? 80 : 0;

  return (
    <BackgroundLayout style={{ padding: 15, paddingBottom: bottomPadding }}>
      <Text style={styles.title}>Conversation</Text>
      <TopConversationList />
      {/* <ConversationList /> */}

      {/* Hiển thị BottomTrack nếu có conversation đang phát */}
      {currentConversation && <BottomTrack />}
    </BackgroundLayout>
  );
};

export default Page;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
