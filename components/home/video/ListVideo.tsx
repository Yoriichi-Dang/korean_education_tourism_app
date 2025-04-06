import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { videos } from "@/data/seed";
import openYoutubeVideo from "@/utils/youtube";
import { Ionicons } from "@expo/vector-icons";
import { getVideos } from "@/services/video-services";
import { useQuery } from "@tanstack/react-query";
const ListVideo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (data?.length === 0) return <Text>No videos available</Text>;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {data?.map((video) => (
        <View key={video.video_id} style={styles.videoContainer}>
          <TouchableOpacity style={styles.videoCard}>
            <Image
              source={{
                uri: video.thumbnail_url as string,
              }}
              resizeMode="cover"
              style={styles.videoPoster}
            />
            <View style={styles.overlay}>
              <View style={styles.wrapperIcon}>
                <Pressable
                  style={styles.playButton}
                  onPress={() =>
                    video.youtube_url && openYoutubeVideo(video.youtube_url)
                  }
                >
                  <Ionicons name="play" size={30} color="white" />
                </Pressable>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.channelName}>{video.channel_name}</Text>
          <Text style={styles.title}>{video.title_ko}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ListVideo;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  videoContainer: {
    marginBottom: 20,
    backgroundColor: "black",
    borderRadius: 12,
  },
  videoCard: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  videoPoster: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  wrapperIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  title: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  channelName: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 10,
  },
});
