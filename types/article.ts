import { Vocabulary } from "./language";

type Article = {
  id: string;
  title: string;
  typeArticle: string;
  imagePath: string;
  content: string;
  vocabulary: Vocabulary[];
};
export default Article;
