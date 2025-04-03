export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ArticlePhrases: {
        Row: {
          article_id: number;
          article_phrase_id: number;
          context_end_index: number | null;
          context_start_index: number | null;
          phrase_id: number;
        };
        Insert: {
          article_id: number;
          article_phrase_id?: number;
          context_end_index?: number | null;
          context_start_index?: number | null;
          phrase_id: number;
        };
        Update: {
          article_id?: number;
          article_phrase_id?: number;
          context_end_index?: number | null;
          context_start_index?: number | null;
          phrase_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ArticlePhrases_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "Articles";
            referencedColumns: ["article_id"];
          },
          {
            foreignKeyName: "ArticlePhrases_phrase_id_fkey";
            columns: ["phrase_id"];
            isOneToOne: false;
            referencedRelation: "Phrases";
            referencedColumns: ["phrase_id"];
          }
        ];
      };
      Articles: {
        Row: {
          article_id: number;
          audio_url: string | null;
          content_ko: string;
          content_vi: string;
          created_at: string | null;
          difficulty_level: string | null;
          image_url: string | null;
          summary_vi: string | null;
          title_ko: string;
          title_vi: string;
          updated_at: string | null;
        };
        Insert: {
          article_id?: number;
          audio_url?: string | null;
          content_ko: string;
          content_vi: string;
          created_at?: string | null;
          difficulty_level?: string | null;
          image_url?: string | null;
          summary_vi?: string | null;
          title_ko: string;
          title_vi: string;
          updated_at?: string | null;
        };
        Update: {
          article_id?: number;
          audio_url?: string | null;
          content_ko?: string;
          content_vi?: string;
          created_at?: string | null;
          difficulty_level?: string | null;
          image_url?: string | null;
          summary_vi?: string | null;
          title_ko?: string;
          title_vi?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      ArticleVocabulary: {
        Row: {
          article_id: number;
          article_vocab_id: number;
          context_end_index: number | null;
          context_start_index: number | null;
          vocab_id: number;
        };
        Insert: {
          article_id: number;
          article_vocab_id?: number;
          context_end_index?: number | null;
          context_start_index?: number | null;
          vocab_id: number;
        };
        Update: {
          article_id?: number;
          article_vocab_id?: number;
          context_end_index?: number | null;
          context_start_index?: number | null;
          vocab_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ArticleVocabulary_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "Articles";
            referencedColumns: ["article_id"];
          },
          {
            foreignKeyName: "ArticleVocabulary_vocab_id_fkey";
            columns: ["vocab_id"];
            isOneToOne: false;
            referencedRelation: "Vocabulary";
            referencedColumns: ["vocab_id"];
          }
        ];
      };
      ConversationPhrases: {
        Row: {
          conv_phrase_id: number;
          conversation_id: number;
          display_order: number | null;
          phrase_id: number;
        };
        Insert: {
          conv_phrase_id?: number;
          conversation_id: number;
          display_order?: number | null;
          phrase_id: number;
        };
        Update: {
          conv_phrase_id?: number;
          conversation_id?: number;
          display_order?: number | null;
          phrase_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ConversationPhrases_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "Conversations";
            referencedColumns: ["conversation_id"];
          },
          {
            foreignKeyName: "ConversationPhrases_phrase_id_fkey";
            columns: ["phrase_id"];
            isOneToOne: false;
            referencedRelation: "Phrases";
            referencedColumns: ["phrase_id"];
          }
        ];
      };
      Conversations: {
        Row: {
          audio_url: string | null;
          content_ko: string;
          content_vi: string;
          conversation_id: number;
          created_at: string | null;
          description_vi: string | null;
          difficulty_level: string | null;
          image_url: string | null;
          title_ko: string;
          title_vi: string;
          updated_at: string | null;
        };
        Insert: {
          audio_url?: string | null;
          content_ko: string;
          content_vi: string;
          conversation_id?: number;
          created_at?: string | null;
          description_vi?: string | null;
          difficulty_level?: string | null;
          image_url?: string | null;
          title_ko: string;
          title_vi: string;
          updated_at?: string | null;
        };
        Update: {
          audio_url?: string | null;
          content_ko?: string;
          content_vi?: string;
          conversation_id?: number;
          created_at?: string | null;
          description_vi?: string | null;
          difficulty_level?: string | null;
          image_url?: string | null;
          title_ko?: string;
          title_vi?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      ConversationVocabulary: {
        Row: {
          conv_vocab_id: number;
          conversation_id: number;
          display_order: number | null;
          vocab_id: number;
        };
        Insert: {
          conv_vocab_id?: number;
          conversation_id: number;
          display_order?: number | null;
          vocab_id: number;
        };
        Update: {
          conv_vocab_id?: number;
          conversation_id?: number;
          display_order?: number | null;
          vocab_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ConversationVocabulary_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "Conversations";
            referencedColumns: ["conversation_id"];
          },
          {
            foreignKeyName: "ConversationVocabulary_vocab_id_fkey";
            columns: ["vocab_id"];
            isOneToOne: false;
            referencedRelation: "Vocabulary";
            referencedColumns: ["vocab_id"];
          }
        ];
      };
      Phrases: {
        Row: {
          audio_url: string | null;
          difficulty_level: string | null;
          example_ko: string | null;
          example_vi: string | null;
          literal_meaning: string | null;
          phrase_id: number;
          phrase_ko: string;
          phrase_vi: string;
          pronunciation: string | null;
          usage_notes: string | null;
        };
        Insert: {
          audio_url?: string | null;
          difficulty_level?: string | null;
          example_ko?: string | null;
          example_vi?: string | null;
          literal_meaning?: string | null;
          phrase_id?: number;
          phrase_ko: string;
          phrase_vi: string;
          pronunciation?: string | null;
          usage_notes?: string | null;
        };
        Update: {
          audio_url?: string | null;
          difficulty_level?: string | null;
          example_ko?: string | null;
          example_vi?: string | null;
          literal_meaning?: string | null;
          phrase_id?: number;
          phrase_ko?: string;
          phrase_vi?: string;
          pronunciation?: string | null;
          usage_notes?: string | null;
        };
        Relationships: [];
      };
      PhraseTopics: {
        Row: {
          display_order: number | null;
          phrase_id: number;
          phrase_topic_id: number;
          topic_id: number;
        };
        Insert: {
          display_order?: number | null;
          phrase_id: number;
          phrase_topic_id?: number;
          topic_id: number;
        };
        Update: {
          display_order?: number | null;
          phrase_id?: number;
          phrase_topic_id?: number;
          topic_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "PhraseTopics_phrase_id_fkey";
            columns: ["phrase_id"];
            isOneToOne: false;
            referencedRelation: "Phrases";
            referencedColumns: ["phrase_id"];
          },
          {
            foreignKeyName: "PhraseTopics_topic_id_fkey";
            columns: ["topic_id"];
            isOneToOne: false;
            referencedRelation: "Topics";
            referencedColumns: ["topic_id"];
          }
        ];
      };
      Topics: {
        Row: {
          active: boolean | null;
          category: string;
          description_vi: string | null;
          difficulty_level: string | null;
          display_order: number | null;
          icon_url: string | null;
          topic_id: number;
          topic_name_ko: string;
          topic_name_vi: string;
        };
        Insert: {
          active?: boolean | null;
          category: string;
          description_vi?: string | null;
          difficulty_level?: string | null;
          display_order?: number | null;
          icon_url?: string | null;
          topic_id?: number;
          topic_name_ko: string;
          topic_name_vi: string;
        };
        Update: {
          active?: boolean | null;
          category?: string;
          description_vi?: string | null;
          difficulty_level?: string | null;
          display_order?: number | null;
          icon_url?: string | null;
          topic_id?: number;
          topic_name_ko?: string;
          topic_name_vi?: string;
        };
        Relationships: [];
      };
      Videos: {
        Row: {
          channel_name: string | null;
          created_at: string | null;
          description_vi: string | null;
          difficulty_level: string | null;
          duration: number | null;
          thumbnail_url: string | null;
          title_ko: string;
          title_vi: string;
          updated_at: string | null;
          video_id: number;
          youtube_url: string;
        };
        Insert: {
          channel_name?: string | null;
          created_at?: string | null;
          description_vi?: string | null;
          difficulty_level?: string | null;
          duration?: number | null;
          thumbnail_url?: string | null;
          title_ko: string;
          title_vi: string;
          updated_at?: string | null;
          video_id?: number;
          youtube_url: string;
        };
        Update: {
          channel_name?: string | null;
          created_at?: string | null;
          description_vi?: string | null;
          difficulty_level?: string | null;
          duration?: number | null;
          thumbnail_url?: string | null;
          title_ko?: string;
          title_vi?: string;
          updated_at?: string | null;
          video_id?: number;
          youtube_url?: string;
        };
        Relationships: [];
      };
      Vocabulary: {
        Row: {
          audio_url: string | null;
          created_at: string | null;
          difficulty_level: string | null;
          example_sentence_ko: string | null;
          example_sentence_vi: string | null;
          image_url: string | null;
          part_of_speech: string | null;
          pronunciation: string | null;
          updated_at: string | null;
          vocab_id: number;
          word_ko: string;
          word_vi: string;
        };
        Insert: {
          audio_url?: string | null;
          created_at?: string | null;
          difficulty_level?: string | null;
          example_sentence_ko?: string | null;
          example_sentence_vi?: string | null;
          image_url?: string | null;
          part_of_speech?: string | null;
          pronunciation?: string | null;
          updated_at?: string | null;
          vocab_id?: number;
          word_ko: string;
          word_vi: string;
        };
        Update: {
          audio_url?: string | null;
          created_at?: string | null;
          difficulty_level?: string | null;
          example_sentence_ko?: string | null;
          example_sentence_vi?: string | null;
          image_url?: string | null;
          part_of_speech?: string | null;
          pronunciation?: string | null;
          updated_at?: string | null;
          vocab_id?: number;
          word_ko?: string;
          word_vi?: string;
        };
        Relationships: [];
      };
      VocabularyTopics: {
        Row: {
          display_order: number | null;
          topic_id: number;
          vocab_id: number;
          vocab_topic_id: number;
        };
        Insert: {
          display_order?: number | null;
          topic_id: number;
          vocab_id: number;
          vocab_topic_id?: number;
        };
        Update: {
          display_order?: number | null;
          topic_id?: number;
          vocab_id?: number;
          vocab_topic_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "VocabularyTopics_topic_id_fkey";
            columns: ["topic_id"];
            isOneToOne: false;
            referencedRelation: "Topics";
            referencedColumns: ["topic_id"];
          },
          {
            foreignKeyName: "VocabularyTopics_vocab_id_fkey";
            columns: ["vocab_id"];
            isOneToOne: false;
            referencedRelation: "Vocabulary";
            referencedColumns: ["vocab_id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
