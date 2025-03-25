import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import Card from "@/components/home/conversation/Card";
import { useRouter } from "expo-router";
import { ConversationListScreen } from "@/components/home/conversation/ConversationListScreen";
import { sampleConversations } from "@/data/seed";

const Page = () => {
  const router = useRouter();
  return (
    <BackgroundLayout style={{ padding: 15 }}>
      <Text style={styles.title}>Conversation</Text>
      <ScrollView
        style={styles.scrollViewContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {sampleConversations.map((item) => (
          <View key={item.id} style={styles.cardShadowContainer}>
            <Card
              id={item.id}
              url={item.url}
              title={item.title}
              artist={item.artist}
              imageUrl={item.imageUrl}
              duration={item.duration}
              createdAt={item.createdAt}
            />
          </View>
        ))}
      </ScrollView>
      <ConversationListScreen />
    </BackgroundLayout>
  );
};

export default Page;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollViewContainer: {
    maxHeight: 290,
  },
  scrollViewContent: {
    paddingVertical: 10, // Add some padding at the top and bottom of scroll view
    paddingRight: 15, // Add some padding at the end of scroll view
  },
  cardShadowContainer: {
    // Shadow properties for the container
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
    marginRight: 15, // Space between cards
    borderRadius: 20, // Match the card's border radius
  },
});
