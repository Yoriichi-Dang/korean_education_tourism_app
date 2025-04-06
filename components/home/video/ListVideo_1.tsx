import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import openYoutubeVideo from "@/utils/youtube";
import { videos } from "@/data/seed";

// Lấy chiều rộng màn hình để tính toán kích thước phù hợp
const { width } = Dimensions.get("window");
const cardWidth = width * 0.6; // Chiều rộng bằng 60% màn hình

const ListVideo = () => {
  // Hàm để mở YouTube khi ấn vào card

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {videos.map((video) => (
        <TouchableOpacity
          key={video.id}
          style={[styles.continueCard, { width: cardWidth }]}
          onPress={() => openYoutubeVideo(video.youtubeId)}
        >
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.continuePoster}
            resizeMode="cover"
          />
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.showTitle}>{video.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  continueCard: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10, // Khoảng cách giữa các card
  },
  continuePoster: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Thêm nền tối để text dễ đọc hơn
  },
  progressInfo: {
    flexDirection: "column",
    marginBottom: 4,
  },

  showTitle: {
    color: "white", // Đổi màu text thành trắng để dễ nhìn hơn trên nền tối
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 16,
  },
});
