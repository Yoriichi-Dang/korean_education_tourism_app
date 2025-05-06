import {
  Conversation,
  ConversationInsert,
  ConversationVocabulary,
  ConversationWithVocabulary,
  Vocabulary,
  VocabularyInsert,
} from "@/types";
import { supabase } from "@/utils/supabase";
import { sampleConversations } from "@/data/seed";

// Lấy danh sách conversations
export async function getConversations(): Promise<Conversation[]> {
  try {
    // Thêm timeout để tránh đợi lâu
    const timeoutPromise = new Promise<Conversation[]>((_, reject) => {
      setTimeout(() => {
        console.log("Fallback to sample data due to timeout");
        return sampleConversations as unknown as Conversation[];
      }, 3000); // Timeout sau 3 giây
    });

    const fetchPromise = new Promise<Conversation[]>(
      async (resolve, reject) => {
        try {
          const { data, error } = await supabase
            .from("Conversations")
            .select("*")
            .order("created_at", { ascending: true });

          if (error) {
            console.error("Supabase error:", error);
            resolve(sampleConversations as unknown as Conversation[]);
          } else {
            resolve(data || []);
          }
        } catch (e) {
          console.error("Network error:", e);
          resolve(sampleConversations as unknown as Conversation[]);
        }
      }
    );

    // Trả về kết quả của promise nào hoàn thành trước
    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    console.error("Fatal error in getConversations:", error);
    return sampleConversations as unknown as Conversation[];
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
