import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ArticleDetail from "@/components/home/article/ArticleDetail";
import { articles } from "@/data/seed";
import Article from "@/types/article";

const Page = () => {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState<Article | null>(null);
  useEffect(() => {
    const article = articles.find((article) => article.id === id);
    if (article) {
      setArticle(article);
    }
  }, []);
  if (!article) {
    return <Text>Loading...</Text>;
  }
  return (
    <ArticleDetail
      id={id as string}
      imagePath={article.imagePath}
      typeArticle={article.typeArticle}
      content={article.content}
      vocabulary={article.vocabulary}
      title={article.title}
    />
  );
};

export default Page;

const styles = StyleSheet.create({});
