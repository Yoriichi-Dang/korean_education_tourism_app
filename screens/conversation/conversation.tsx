import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import BackButton from "@/components/common/BackButton";
import { sampleConversations } from "@/data/seed";
import DotMore from "@/components/icons/DotMore";
import ProgressBar from "@/components/home/conversation/ProgressBar";
import AudioBottom from "@/components/home/conversation/AudioBottom";
import BottomOverlay from "@/components/home/conversation/BottomOverlay";

const ConversationScreen = ({ id }: { id: number }) => {
  const { currentConversation, isPlaying } = useAudioPlayer();
  const isActive = currentConversation?.conversation_id === id && isPlaying;
  console.log(isActive);
  const current = sampleConversations.find(
    (conversation) => conversation.id === id
  );
  if (!currentConversation) return null;
  return (
    <BackgroundLayout>
      <View style={styles.header}>
        <BackButton />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            {isActive ? "Now Playing" : "Conversation"}
          </Text>
          <Text style={styles.title}>{current.title}</Text>
        </View>
        <DotMore width={24} height={24} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: current.imageUrl }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{current.title}</Text>
        <Text style={styles.contentArtist}>{current.artist}</Text>
      </View>
      <ProgressBar id={id} />
      <AudioBottom item={current} />
      <BottomOverlay item={current} />
    </BackgroundLayout>
  );
};

export default ConversationScreen;

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
  subTitle: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  title: {
    width: "90%",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
