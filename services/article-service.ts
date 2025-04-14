import {
  Article,
  ArticleInsert,
  Vocabulary,
  ArticleWithVocabularyCount,
  VocabularyInsert,
  ArticleWithVocabulary,
} from "@/types";
import { supabase } from "@/utils/supabase";

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("Articles")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data || [];
}

export async function getArticleById(
  articleId: number
): Promise<Article | null> {
  const { data, error } = await supabase
    .from("Articles")
    .select("*")
    .eq("article_id", articleId)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    return null;
  }

  return data;
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
    // Step 1: Get the article first
    const { data: article, error: articleError } = await supabase
      .from("Articles")
      .select("*")
      .eq("article_id", articleId)
      .single();
    if (articleError) {
      console.error("Error fetching article:", articleError);
      return null;
    }

    if (!article) {
      console.log("Article not found");
      return null;
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
    console.error("Unexpected error in getArticleWithVocabulary:", error);
    return null;
  }
}

/**
 * Gets all articles with their vocabulary counts
 */
export async function getArticlesWithVocabularyCounts(): Promise<
  ArticleWithVocabularyCount[]
> {
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
    return [];
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
}
/**
 * Gets a specific article vocabulary relationship
 */
export async function getArticleVocabularyRelationship(
  articleId: number,
  vocabId: number
) {
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
}
