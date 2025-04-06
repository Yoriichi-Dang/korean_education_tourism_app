import {
  Conversation,
  ConversationInsert,
  ConversationVocabulary,
  ConversationWithVocabulary,
  Vocabulary,
  VocabularyInsert,
} from "@/types";
import { supabase } from "@/utils/supabase";

// Lấy danh sách conversations
export async function getConversations(): Promise<Conversation[]> {
  try {
    const { data, error } = await supabase
      .from("Conversations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

// Lấy chi tiết của một conversation với vocabularies
export async function getConversationWithVocabulary(
  id: number
): Promise<ConversationWithVocabulary | null> {
  try {
    // Lấy thông tin conversation
    const { data: conversation, error: convError } = await supabase
      .from("Conversations")
      .select("*")
      .eq("conversation_id", id)
      .single();

    if (convError) {
      return null;
    }

    // Lấy từ vựng liên kết với conversation
    const { data: vocabLinks, error: vocabError } = await supabase
      .from("ConversationVocabulary")
      .select(
        `
        conv_vocab_id,
        display_order,
        vocab_id,
        vocabulary: Vocabulary (*)
      `
      )
      .eq("conversation_id", id)
      .order("display_order", { ascending: true });

    if (vocabError) {
      return {
        ...conversation,
        vocabulary: [],
      };
    }

    // Lấy dữ liệu vocabulary theo định dạng phù hợp với interface ConversationWithVocabulary
    const vocabulary = vocabLinks.map((link) => link.vocabulary);

    return {
      ...conversation,
      vocabulary: vocabulary,
    };
  } catch (error) {
    console.error("Error getting conversation with vocabulary:", error);
    return null;
  }
}
