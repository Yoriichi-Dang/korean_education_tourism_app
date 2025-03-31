import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { videos } from "@/data/seed";
import openYoutubeVideo from "@/utils/youtube";

const TopTrendingVideo = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* Movie Card 1 */}
      {videos.map((video) => (
        <TouchableOpacity
          key={video.id}
          style={styles.videoCard}
          onPress={() => {
            openYoutubeVideo(video.youtubeId);
          }}
        >
          <Image
            source={{
              uri: video.thumbnail,
            }}
            style={styles.videoPoster}
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Hello</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TopTrendingVideo;

const styles = StyleSheet.create({
  videoCard: {
    marginRight: 12,
    width: 140,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  videoPoster: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  movieTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  overlayTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
