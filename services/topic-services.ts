// src/services/topicService.ts
import { supabase } from "@/utils/supabase";
import { Topic, TopicWithVocabulary, Vocabulary } from "@/types";
export type TopicWithCount = Topic & { vocab_count: number };

export const searchTopics = async (
  searchTerm: string = "",
  limit: number = 10
): Promise<TopicWithCount[]> => {
  // Nếu searchTerm rỗng, lấy tất cả topics
  if (!searchTerm || searchTerm.trim() === "") {
    const { data, error } = await supabase
      .from("Topics")
      .select(
        `
        *,
        VocabularyTopics!inner (
          vocab_id
        )
      `
      )
      .order("display_order")
      .limit(limit);

    if (error) {
      console.error("Error fetching all topics:", error);
      throw error;
    }

    // Tính toán số lượng từ vựng trong mỗi topic
    const topicsWithCount =
      data?.map((topic) => {
        const vocabCount = Array.isArray(topic.VocabularyTopics)
          ? topic.VocabularyTopics.length
          : 0;
        // Loại bỏ trường VocabularyTopics và thêm trường vocab_count
        const { VocabularyTopics, ...topicData } = topic;
        return {
          ...topicData,
          vocab_count: vocabCount,
        };
      }) || [];

    return topicsWithCount;
  }

  // Logic tìm kiếm theo từ khóa như cũ
  const normalizedSearchTerm = searchTerm.trim();

  const { data, error } = await supabase
    .from("Topics")
    .select(
      `
      *,
      VocabularyTopics!inner (
        vocab_id
      )
    `
    )
    .or(
      `topic_name_vi.ilike.%${normalizedSearchTerm}%,` +
        `topic_name_ko.ilike.%${normalizedSearchTerm}%,` +
        `description_vi.ilike.%${normalizedSearchTerm}%`
    )
    .limit(limit)
    .order("display_order");

  if (error) {
    console.error("Error searching topics:", error);
    throw error;
  }

  // Tính toán số lượng từ vựng trong mỗi topic
  const topicsWithCount =
    data?.map((topic) => {
      const vocabCount = Array.isArray(topic.VocabularyTopics)
        ? topic.VocabularyTopics.length
        : 0;
      // Loại bỏ trường VocabularyTopics và thêm trường vocab_count
      const { VocabularyTopics, ...topicData } = topic;
      return {
        ...topicData,
        vocab_count: vocabCount,
      };
    }) || [];

  return topicsWithCount;
};

export const getTopics = async (): Promise<TopicWithCount[]> => {
  const { data, error } = await supabase
    .from("Topics")
    .select(
      `
        *,
        VocabularyTopics!inner (
          vocab_id
        )
      `
    )
    .order("display_order");

  if (error) throw error;

  // Tính toán số lượng từ vựng trong mỗi topic
  const topicsWithCount =
    data?.map((topic) => {
      const vocabCount = Array.isArray(topic.VocabularyTopics)
        ? topic.VocabularyTopics.length
        : 0;

      // Loại bỏ trường VocabularyTopics và thêm trường vocab_count
      const { VocabularyTopics, ...topicData } = topic;

      return {
        ...topicData,
        vocab_count: vocabCount,
      };
    }) || [];

  return topicsWithCount;
};

export const getTopicWithVocabulary = async (
  topicId: number
): Promise<TopicWithVocabulary | null> => {
  const { data: topic, error: topicError } = await supabase
    .from("Topics")
    .select("*")
    .eq("topic_id", topicId)
    .single();

  if (topicError) throw topicError;

  const { data: vocabTopics, error: vocabError } = await supabase
    .from("VocabularyTopics")
    .select(
      `
      vocab_id,
      Vocabulary(*)
    `
    )
    .eq("topic_id", topicId)
    .order("display_order");

  if (vocabError) throw vocabError;

  const vocabulary = vocabTopics.map((vt) => vt.Vocabulary) as Vocabulary[];

  return {
    ...topic,
    vocabulary,
  };
};
