import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { travelTopics } from "@/data/seed";
import { useFlashCard } from "@/hooks/useFlashCard";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashCard from "@/components/home/topic/FlashCard";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

const Page = () => {
  const { id } = useLocalSearchParams();
  const selectTopic = useFlashCard((state) => state.selectTopic);
  const resetTopic = useFlashCard((state) => state.resetTopic);

  // Hàm fetch lại dữ liệu
  const fetchVocabByTopicID = async (topicId: string) => {
    try {
      resetTopic(); // Reset lại topic mỗi lần gọi
      await new Promise((resolve) => setTimeout(resolve, 500)); // Reduced timeout for better UX
      const topic = travelTopics.find((topic) => topic.id === topicId);
      if (topic) {
        selectTopic(topic);
      }
    } catch (error) {
      console.error("Error fetching vocabulary:", error);
    }
  };

  // Lưu trữ dữ liệu đã được fetch bằng useMemo
  const memoizedFetchData = useMemo(() => {
    if (id) {
      const topic = travelTopics.find((topic) => topic.id === id.toString());
      return topic; // Trả về topic nếu tìm thấy, nếu không sẽ là undefined
    }
    return null;
  }, [id]);

  // Dùng useFocusEffect để fetch lại dữ liệu mỗi khi trang được focus lại
  useFocusEffect(
    React.useCallback(() => {
      // Always reset first to ensure we start from the beginning
      resetTopic();

      // Always refetch the topic data when returning to this page
      if (id) {
        const topic = travelTopics.find((topic) => topic.id === id.toString());
        if (topic) {
          // This will set currentVocabularyIndex to 0
          selectTopic(topic);
        }
      }

      return () => {
        // Cleanup when leaving the page
        resetTopic();
      };
    }, [id, resetTopic, selectTopic])
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BackgroundLayout>
        <FlashCard key={id?.toString() || "default"} />
      </BackgroundLayout>
    </GestureHandlerRootView>
  );
};

export default Page;
