import { Vocabulary, TopicWithVocabulary } from "@/types";
import { create } from "zustand";
type FlashCard = {
  currentTopic: TopicWithVocabulary | null;
  vocabularies: Vocabulary[];
  currentVocabularyIndex: number;
  isFlipped: boolean;
  showFront: boolean;
  //actions
  selectTopic: (topic: TopicWithVocabulary) => void;
  nextVocabulary: () => void;
  flipCard: () => void;
  resetTopic: () => void;
  toggleCardFace: () => void;

  // Selectors
  getCurrentTopic: () => TopicWithVocabulary | null;
  getCurrentVocab: () => Vocabulary | null;
  getCurrentVocabIndex: () => number;
  getProgress: () => { current: number; total: number };
};

export const useFlashCard = create<FlashCard>((set, get) => ({
  currentTopic: null,
  vocabularies: [],
  currentVocabularyIndex: 0,
  isFlipped: false,
  showFront: true,

  selectTopic: (topic: TopicWithVocabulary) =>
    set({
      currentTopic: topic,
      vocabularies: topic.vocabulary,
      currentVocabularyIndex: 0,
    }),

  nextVocabulary: () =>
    set((state) => ({
      currentVocabularyIndex: state.currentVocabularyIndex + 1,
    })),

  flipCard: () => set((state) => ({ isFlipped: !state.isFlipped })),

  resetTopic: () =>
    set({
      currentTopic: null,
      vocabularies: [],
      currentVocabularyIndex: 0,
    }),

  toggleCardFace: () => set((state) => ({ showFront: !state.showFront })),

  getCurrentTopic: () => get().currentTopic!,

  // getCurrentVocab: () => get().vocabularies[get().currentVocabularyIndex],
  getCurrentVocab: () => {
    const currentVocabIndex = get().currentVocabularyIndex;
    const vocabularies = get().vocabularies;
    if (currentVocabIndex >= vocabularies.length) {
      return null;
    }
    const currentVocab = vocabularies[currentVocabIndex];
    return currentVocab;
  },
  getCurrentVocabIndex: () => get().currentVocabularyIndex,
  getProgress: () => ({
    current: get().currentVocabularyIndex + 1,
    total: get().vocabularies.length,
  }),
}));
