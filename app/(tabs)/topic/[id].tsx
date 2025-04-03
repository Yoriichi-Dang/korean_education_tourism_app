import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useFlashCard } from "@/hooks/useFlashCard";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashCard from "@/components/home/topic/FlashCard";
import { useFocusEffect } from "@react-navigation/native";
import { getTopicWithVocabulary } from "@/services/topic-services";
import { TopicWithVocabulary } from "@/types";

// Cache để lưu trữ topics theo ID
const topicsCache = new Map<number, TopicWithVocabulary>();

const Page = () => {
  const { id } = useLocalSearchParams();
  const topicId = id ? Number(id) : null;
  const selectTopic = useFlashCard((state) => state.selectTopic);
  const resetTopic = useFlashCard((state) => state.resetTopic);
  const [loading, setLoading] = useState(false);

  // Sử dụng useMemo để lấy dữ liệu topic từ cache hoặc null
  const cachedTopic = useMemo(() => {
    return topicId && topicsCache.has(topicId)
      ? topicsCache.get(topicId)
      : null;
  }, [topicId]);

  // Fetch dữ liệu chỉ khi không có trong cache
  useEffect(() => {
    if (topicId && !topicsCache.has(topicId)) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const topicWithVocabularies = await getTopicWithVocabulary(topicId);
          if (topicWithVocabularies) {
            topicsCache.set(topicId, topicWithVocabularies);
            selectTopic(topicWithVocabularies);
          }
        } catch (error) {
          console.error("Error fetching topic:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (topicId && cachedTopic) {
      // Sử dụng dữ liệu đã cache
      selectTopic(cachedTopic);
    }
  }, [topicId, cachedTopic, selectTopic]);

  // Áp dụng dữ liệu vào state khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      // Reset state khi màn hình được focus
      resetTopic();

      // Nếu có dữ liệu đã cache, sử dụng nó
      if (topicId && topicsCache.has(topicId)) {
        const cachedTopicData = topicsCache.get(topicId);
        if (cachedTopicData) {
          selectTopic(cachedTopicData);
        }
      }

      return () => {
        // Cleanup khi rời khỏi trang
        resetTopic();
      };
    }, [topicId, resetTopic, selectTopic])
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BackgroundLayout>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlashCard key={id?.toString() || "default"} />
        )}
      </BackgroundLayout>
    </GestureHandlerRootView>
  );
};

export default Page;
