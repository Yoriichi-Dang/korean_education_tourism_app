import { Audio } from "expo-av";
import { Vocabulary } from "./language";

export interface ConversationTrack {
  id: string;
  url: string;
  title: string;
  artist?: string;
  imageUrl: string;
  duration: number;
  createdAt: string;
  vocabularies: Vocabulary[];
}

export interface AudioPlayerState {
  // State
  currentConversation: ConversationTrack | null;
  isPlaying: boolean;
  soundObject: Audio.Sound | null;
  playlist: ConversationTrack[];
  isLoading: boolean;

  // Actions
  playAudio: (song: ConversationTrack) => Promise<void>;
  pauseAudio: () => Promise<void>;
  resumeAudio: () => Promise<void>;
  stopAudio: () => Promise<void>;
  addToPlaylist: (song: ConversationTrack) => void;
  removeFromPlaylist: (songId: string) => void;
  nextAudio: () => Promise<void>;
  previousAudio: () => Promise<void>;
}
