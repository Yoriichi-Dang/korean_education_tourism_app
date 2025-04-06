import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ArticleDetail from "@/components/home/article/ArticleDetail";
import { getArticleWithVocabulary } from "@/services/article-service";
import { useQuery } from "@tanstack/react-query";
const Page = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleWithVocabulary(Number(id)),
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (!data) return <Text>No article found</Text>;

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

const styles = StyleSheet.create({});
