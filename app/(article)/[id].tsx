import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ArticleDetail from "@/components/home/article/ArticleDetail";
import { getArticleWithVocabulary } from "@/services/article-service";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { id } = useLocalSearchParams();

  // Kiểm tra và đảm bảo id là số hợp lệ
  const articleId = typeof id === "string" ? parseInt(id) : NaN;
  const isValidId = !isNaN(articleId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => (isValidId ? getArticleWithVocabulary(articleId) : null),
    enabled: isValidId, // Chỉ query khi id hợp lệ
  });

  if (!isValidId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid article ID</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Loading article...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error loading article: {(error as Error).message}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No article found</Text>
      </View>
    );
  }

  return (
    <ArticleDetail
      image_url={data.image_url}
      content_ko={data.content_ko}
      vocabulary={data.vocabulary}
      content_vi={data.content_vi}
      author_name={data.author_name}
      title_ko={data.title_ko}
    />
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
