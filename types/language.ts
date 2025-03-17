type TypeWord =
  | "Động từ"
  | "Danh từ"
  | "Tính từ"
  | "Phó từ"
  | "Liên từ"
  | "Giới từ"
  | "Thán từ"
  | "Số từ"
  | "Trạng từ"
  | "Thể từ";
type Vocabulary = {
  id: string;
  word: string;
  romanized: string;
  vietnamese: string;
  example: string;
  type: TypeWord;
};

type TravelTopic = {
  id: string;
  romanized: string;
  hangul: string;
  vietnamese: string;
  english: string;
  vocabulary: Vocabulary[];
};

export { TravelTopic, Vocabulary };
