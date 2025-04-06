// types/supabaseTypes.ts

import { Database } from "./supabase";

// Articles
export type Article = Database["public"]["Tables"]["Articles"]["Row"];
export type ArticleInsert = Database["public"]["Tables"]["Articles"]["Insert"];
export type ArticleUpdate = Database["public"]["Tables"]["Articles"]["Update"];

// ArticlePhrases
export type ArticlePhrase =
  Database["public"]["Tables"]["ArticlePhrases"]["Row"];
export type ArticlePhraseInsert =
  Database["public"]["Tables"]["ArticlePhrases"]["Insert"];
export type ArticlePhraseUpdate =
  Database["public"]["Tables"]["ArticlePhrases"]["Update"];

// ArticleVocabulary
export type ArticleVocabulary =
  Database["public"]["Tables"]["ArticleVocabulary"]["Row"];
export type ArticleVocabularyInsert =
  Database["public"]["Tables"]["ArticleVocabulary"]["Insert"];
export type ArticleVocabularyUpdate =
  Database["public"]["Tables"]["ArticleVocabulary"]["Update"];

// Conversations
export type Conversation = Database["public"]["Tables"]["Conversations"]["Row"];
export type ConversationInsert =
  Database["public"]["Tables"]["Conversations"]["Insert"];
export type ConversationUpdate =
  Database["public"]["Tables"]["Conversations"]["Update"];

// ConversationPhrases
export type ConversationPhrase =
  Database["public"]["Tables"]["ConversationPhrases"]["Row"];
export type ConversationPhraseInsert =
  Database["public"]["Tables"]["ConversationPhrases"]["Insert"];
export type ConversationPhraseUpdate =
  Database["public"]["Tables"]["ConversationPhrases"]["Update"];

// ConversationVocabulary
export type ConversationVocabulary =
  Database["public"]["Tables"]["ConversationVocabulary"]["Row"];
export type ConversationVocabularyInsert =
  Database["public"]["Tables"]["ConversationVocabulary"]["Insert"];
export type ConversationVocabularyUpdate =
  Database["public"]["Tables"]["ConversationVocabulary"]["Update"];

// Phrases
export type Phrase = Database["public"]["Tables"]["Phrases"]["Row"];
export type PhraseInsert = Database["public"]["Tables"]["Phrases"]["Insert"];
export type PhraseUpdate = Database["public"]["Tables"]["Phrases"]["Update"];

// PhraseTopics
export type PhraseTopic = Database["public"]["Tables"]["PhraseTopics"]["Row"];
export type PhraseTopicInsert =
  Database["public"]["Tables"]["PhraseTopics"]["Insert"];
export type PhraseTopicUpdate =
  Database["public"]["Tables"]["PhraseTopics"]["Update"];

// Topics
export type Topic = Database["public"]["Tables"]["Topics"]["Row"];
export type TopicInsert = Database["public"]["Tables"]["Topics"]["Insert"];
export type TopicUpdate = Database["public"]["Tables"]["Topics"]["Update"];

// Videos
export type Video = Database["public"]["Tables"]["Videos"]["Row"];
export type VideoInsert = Database["public"]["Tables"]["Videos"]["Insert"];
export type VideoUpdate = Database["public"]["Tables"]["Videos"]["Update"];

// Vocabulary
export type Vocabulary = Database["public"]["Tables"]["Vocabulary"]["Row"];
export type VocabularyInsert =
  Database["public"]["Tables"]["Vocabulary"]["Insert"];
export type VocabularyUpdate =
  Database["public"]["Tables"]["Vocabulary"]["Update"];

// VocabularyTopics
export type VocabularyTopic =
  Database["public"]["Tables"]["VocabularyTopics"]["Row"];
export type VocabularyTopicInsert =
  Database["public"]["Tables"]["VocabularyTopics"]["Insert"];
export type VocabularyTopicUpdate =
  Database["public"]["Tables"]["VocabularyTopics"]["Update"];

// Bạn cũng có thể tạo một số type hữu ích khác

// Type cho các difficulty levels
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

// Type cho các relationship dữ liệu phổ biến
export interface TopicWithVocabulary extends Topic {
  vocabulary: Vocabulary[];
}

export interface TopicWithPhrases extends Topic {
  phrases: Phrase[];
}

export interface VocabularyWithTopics extends Vocabulary {
  topics: Topic[];
}

export interface PhraseWithTopics extends Phrase {
  topics: Topic[];
}

export interface ArticleWithVocabulary extends Article {
  vocabulary: Array<{
    vocab_data: Vocabulary;
    article_vocab_id: number;
    context_start_index: number | null;
    context_end_index: number | null;
  }>;
}

export interface ArticleWithPhrases extends Article {
  phrases: Phrase[];
}

export interface ConversationWithVocabulary extends Conversation {
  vocabulary: Vocabulary[];
}

export interface ConversationWithPhrases extends Conversation {
  phrases: Phrase[];
}

export interface VideoWithVocabulary extends Video {
  vocabulary: Vocabulary[];
}

export interface VideoWithPhrases extends Video {
  phrases: Phrase[];
}

export type TopicWithCount = Topic & { vocab_count: number };
export type ArticleWithVocabularyCount = Article & {
  vocab_count: number;
};
export type VocabularyArticle = {
  vocab_data: Vocabulary;
  article_vocab_id: number;
  context_start_index: number | null;
  context_end_index: number | null;
};

export type ConversationWithVocabularyCount = Conversation & {
  vocab_count: number;
};
