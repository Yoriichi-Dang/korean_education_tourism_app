import { FlatList, StyleSheet } from "react-native";
import React from "react";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { articles } from "@/data/seed";
import ArticleItem from "@/components/home/article/ArticleItem";
import Filter from "@/components/home/article/Filter";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { getArticles } from "@/services/article-service";
import { useQuery } from "@tanstack/react-query";
const Page = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (data?.length === 0) return <Text>No articles available</Text>;
  return (
    <BackgroundLayout style={{ padding: 20 }}>
      <Text style={styles.title}>Article</Text>
      <Text style={styles.subTitle}>News info about korean</Text>
      <FlatList
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        data={data}
        keyExtractor={(item) => item.article_id.toString()}
        renderItem={({ item }) => (
          <ArticleItem
            onPress={() => {
              router.push(`/(article)/${item.article_id}`);
            }}
            article_id={item.article_id}
            image_url={item.image_url}
            title_ko={item.title_ko}
            content_ko={item.content_ko}
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
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: "#888",
    fontWeight: "semibold",
    marginBottom: 30,
  },
});
