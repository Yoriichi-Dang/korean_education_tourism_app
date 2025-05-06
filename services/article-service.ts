import {
  Article,
  ArticleInsert,
  Vocabulary,
  ArticleWithVocabularyCount,
  VocabularyInsert,
  ArticleWithVocabulary,
} from "@/types";
import { supabase } from "@/utils/supabase";
import { articles } from "@/data/seed";

export async function getArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from("Articles")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching articles:", error);
      return articles as Article[];
    }

    return data || [];
  } catch (error) {
    console.error("Network error fetching articles:", error);
    return articles as Article[];
  }
}

export async function getArticleById(
  articleId: number
): Promise<Article | null> {
  if (isNaN(articleId)) {
    console.error("Invalid article ID: NaN");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("Articles")
      .select("*")
      .eq("article_id", articleId)
      .single();

    if (error) {
      console.error("Error fetching article:", error);
      const sampleArticle = articles.find((a) => a.article_id === articleId);
      return (sampleArticle as Article) || null;
    }

    return data;
  } catch (error) {
    console.error("Network error fetching article by ID:", error);
    const sampleArticle = articles.find((a) => a.article_id === articleId);
    return (sampleArticle as Article) || null;
  }
}

/**
 * Fetches an article along with all its related vocabularies
 * @param articleId The ID of the article to fetch
 * @returns The article with its vocabularies, or null if not found
 */
export async function getArticleWithVocabulary(
  articleId: number
): Promise<ArticleWithVocabulary | null> {
  try {
    // Validate articleId
    if (isNaN(articleId) || articleId <= 0) {
      throw new Error(`Invalid article ID: ${articleId}`);
    }

    // Step 1: Get the article first
    const { data: article, error: articleError } = await supabase
      .from("Articles")
      .select("*")
      .eq("article_id", articleId)
      .single();

    if (articleError) {
      console.error("Error fetching article:", articleError);

      // Try to find article in sample data
      const sampleArticle = articles.find((a) => a.article_id === articleId);
      if (sampleArticle) {
        return {
          ...(sampleArticle as Article),
          vocabulary: [],
        };
      }

      throw new Error(articleError.message);
    }

    if (!article) {
      throw new Error(`Article with ID ${articleId} not found`);
    }

    // Step 2: Try to get vocabularies (if any)
    const { data: vocabRelations, error: vocabError } = await supabase
      .from("ArticleVocabulary")
      .select(
        `
        article_vocab_id,
        context_start_index,
        context_end_index,
        vocab_id,
        Vocabulary (*)
      `
      )
      .eq("article_id", articleId);

    // Initialize empty vocabulary array
    let vocabulary: {
      vocab_data: Vocabulary;
      article_vocab_id: number;
      context_start_index: number | null;
      context_end_index: number | null;
    }[] = [];

    // If there was no error and we have data
    if (!vocabError && vocabRelations && vocabRelations.length > 0) {
      vocabulary = vocabRelations
        .filter((item) => item && item.Vocabulary) // Filter out any null items
        .map((item) => ({
          vocab_data: item.Vocabulary,
          article_vocab_id: item.article_vocab_id,
          context_start_index: item.context_start_index,
          context_end_index: item.context_end_index,
        }));
    } else if (vocabError) {
      // Log the error but continue with empty vocabulary
      console.error("Error fetching article vocabularies:", vocabError);
    }

    // Return the article with vocabulary (empty array if none found)
    const articleWithVocabulary: ArticleWithVocabulary = {
      ...article,
      vocabulary,
    };
    return articleWithVocabulary;
  } catch (error) {
    console.error("Error in getArticleWithVocabulary:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to load article: ${error.message}`);
    }
    throw new Error("Failed to load article");
  }
}

/**
 * Gets all articles with their vocabulary counts
 */
export async function getArticlesWithVocabularyCounts(): Promise<
  ArticleWithVocabularyCount[]
> {
  try {
    const { data, error } = await supabase
      .from("Articles")
      .select(
        `
          *,
          ArticleVocabulary (
            vocab_id
          )
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching articles with vocabulary counts:", error);
      return articles.map((article) => ({
        ...(article as Article),
        vocab_count: 0,
      }));
    }

    // Transform data to include vocab count
    return data.map((article) => {
      const vocabCount = Array.isArray(article.ArticleVocabulary)
        ? article.ArticleVocabulary.length
        : 0;
      const { ...articleData } = article;
      return {
        ...articleData,
        vocab_count: vocabCount,
      };
    });
  } catch (error) {
    console.error("Network error in getArticlesWithVocabularyCounts:", error);
    return articles.map((article) => ({
      ...(article as Article),
      vocab_count: 0,
    }));
  }
}

/**
 * Gets a specific article vocabulary relationship
 */
export async function getArticleVocabularyRelationship(
  articleId: number,
  vocabId: number
) {
  // Validate IDs
  if (isNaN(articleId) || isNaN(vocabId)) {
    console.error("Invalid ID(s):", { articleId, vocabId });
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("ArticleVocabulary")
      .select("*")
      .eq("article_id", articleId)
      .eq("vocab_id", vocabId)
      .single();

    if (error) {
      console.error("Error fetching article vocabulary relationship:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Network error in getArticleVocabularyRelationship:", error);
    return null;
  }
}
