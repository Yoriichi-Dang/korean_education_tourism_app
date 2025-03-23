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
import ConversationItem from "@/components/home/conversation/ConversationItem";
import { useRouter } from "expo-router";
const Page = () => {
  const router = useRouter();
  return (
    <BackgroundLayout style={{ padding: 20 }}>
      <Text style={styles.title}>Conversation</Text>
      <ScrollView
        style={{
          maxHeight: 300,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Card
            id={index.toString()}
            key={index}
            title="Conversation 1"
            imageUrl="https://picsum.photos/200/300"
            onPress={() => {
              router.push(`/(conversation)/${index}`);
            }}
          />
        ))}
      </ScrollView>

      <Text style={styles.subTitle}>Top Conversation</Text>
      <FlatList
        style={{ marginTop: 20, flex: 1 }}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        data={Array.from({ length: 10 })}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({ index }) => (
          <ConversationItem
            id={index.toString()}
            title="Conversation 1"
            subTitle="Subtitle"
            imageUrl="https://image.vietnamnews.vn/uploadvnnews/Article/2019/7/22/26541_b.JPG"
          />
        )}
      />
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
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
});
