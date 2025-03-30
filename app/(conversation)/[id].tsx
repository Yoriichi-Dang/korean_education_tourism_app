import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import BackButton from "@/components/common/BackButton";
import LeftChevron from "@/components/icons/LeftChevron";
import { sampleConversations } from "@/data/seed";
import DotMore from "@/components/icons/DotMore";

const Page = () => {
  const { id } = useLocalSearchParams();
  const { currentTrack, isPlaying } = useAudioPlayer();
  const isActive = currentTrack?.id === id && isPlaying;
  const currentConversation = sampleConversations.find(
    (conversation) => conversation.id === id
  );
  return (
    <BackgroundLayout>
      <View style={styles.header}>
        <BackButton />
        <View style={styles.titleContainer}>
          <Text>{isActive ? "Now Playing" : "Conversation"}</Text>
          <Text>{currentConversation?.title}</Text>
        </View>
        <DotMore width={24} height={24} />
      </View>
    </BackgroundLayout>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    gap: 10,
  },
});
