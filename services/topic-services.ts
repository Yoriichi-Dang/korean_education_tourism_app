// src/services/topicService.ts
import { supabase } from "@/utils/supabase";
import { Topic, TopicWithVocabulary, Vocabulary } from "@/types";
export type TopicWithCount = Topic & { vocab_count: number };

export const searchTopics = async (
  searchTerm: string = "",
  limit: number = 10
): Promise<TopicWithCount[]> => {
  const normalizedSearchTerm = searchTerm.trim();

  // Sử dụng raw SQL query thay vì rpc
  const { data, error } = await supabase
    .from("Topics")
    .select(
      `
      *,
      VocabularyTopics (
        vocab_id
      )
    `
    )
    .ilike("topic_name_vi", `%${normalizedSearchTerm}%`)
    .limit(limit);

  if (error) {
    console.error("Error searching topics:", error);
    throw error;
  }

  // Transform data để tính vocab_count
  return (
    data?.map((topic) => {
      const vocabCount = Array.isArray(topic.VocabularyTopics)
        ? topic.VocabularyTopics.length
        : 0;
      const { VocabularyTopics, ...topicData } = topic;
      return {
        ...topicData,
        vocab_count: vocabCount,
      };
    }) || []
  );
};

// Hàm helper để transform data
const transformTopicsData = (data: any[]): TopicWithCount[] => {
  return (
    data?.map((topic) => {
      const vocabCount = Array.isArray(topic.VocabularyTopics)
        ? topic.VocabularyTopics.length
        : 0;
      const { VocabularyTopics, ...topicData } = topic;
      return {
        ...topicData,
        vocab_count: vocabCount,
      };
    }) || []
  );
};

export async function getTopicsWithCount(): Promise<TopicWithCount[]> {
  const { data, error } = await supabase
    .from("Topics")
    .select(
      `
        *,
        VocabularyTopics (
          vocab_id
        )
      `
    )
    .order("display_order");

  if (error) {
    throw new Error(error.message);
  }

  // Transform data to include vocab count
  return data.map((topic) => {
    const vocabCount = Array.isArray(topic.VocabularyTopics)
      ? topic.VocabularyTopics.length
      : 0;
    const { ...topicData } = topic;
    return {
      ...topicData,
      vocab_count: vocabCount,
    };
  });
}
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
