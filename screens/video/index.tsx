import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import TopTrendingVideo from "@/components/home/video/TopTrendingVideo";
import ListVideo from "@/components/home/video/ListVideo";

const VideoConversationScreen = () => {
  return (
    <BackgroundLayout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trending Movies Section */}
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top trending video</Text>
          </View>
          <TopTrendingVideo />
        </View> */}

        {/* Continue Watching Section */}

        {/* New Released Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>List Video</Text>
            <Feather name="chevron-right" size={20} color="white" />
          </View>
          <ListVideo />

          {/* New movies would go here */}
        </View>
      </ScrollView>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "black",
    fontSize: 22,
    fontWeight: "600",
  },
});

export default VideoConversationScreen;
