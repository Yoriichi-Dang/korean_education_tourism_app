import { StyleSheet, Text, View, ScrollView } from "react-native";
import Card from "@/components/home/conversation/Card";
import { sampleConversations } from "@/data/seed";
import React from "react";

const ConversationList = () => {
  return (
    <View>
      <Text style={styles.title}>Conversation</Text>
      <ScrollView
        style={styles.scrollViewContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {sampleConversations.map((item) => (
          <View key={item.id} style={styles.cardShadowContainer}>
            <Card item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ConversationList;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
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
