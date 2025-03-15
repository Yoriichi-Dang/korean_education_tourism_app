interface Vocabulary {
  id: string;
  word: string;
  romanized: string;
  vietnamese: string;
  example: string;
  type: string; // Loại từ: Danh từ, Động từ, Tính từ...
}

interface TravelTopic {
  id: string;
  romanized: string;
  hangul: string;
  vietnamese: string;
  english: string;
  vocabulary: Vocabulary[];
}

export { TravelTopic, Vocabulary };
