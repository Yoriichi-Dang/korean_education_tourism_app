import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Fonts from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Vocabulary } from "@/types";
import { VocabularyAudioContext } from "@/app/_layout";

type Props = {
  vocabularies: any[];
};
const ArticleVocabulary = ({ vocabularies }: Props) => {
  const vocabAudio = useContext(VocabularyAudioContext);
  if (vocabularies.length === 0) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>Vocabulary</Text>
      {vocabularies.map((item, index) => {
        const vocab_data: Vocabulary = item.vocab_data;
        return (
          <View key={index} style={styles.vocabContainer}>
            <View>
              <Text style={styles.vocabTitle}>{vocab_data.word_ko}</Text>
              <Text style={styles.vocabSubtitle}>
                [{vocab_data.pronunciation}]
              </Text>
              <Text style={styles.vocabContent}>{vocab_data.word_vi}</Text>
              <Text style={styles.exampleTitle}>Examples</Text>
              <Text style={styles.exampleContent}>
                {vocab_data.example_sentence_ko}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 20,
                top: 20,
                padding: 10,
                backgroundColor: Colors.light.black,
                borderRadius: 6,
              }}
              onPress={(e) => {
                e.stopPropagation();
                if (vocab_data.audio_url && vocabAudio) {
                  vocabAudio.playVocabularyAudio(vocab_data.audio_url);
                }
              }}
            >
              <FontAwesome
                name="volume-up"
                size={24}
                color={Colors.light.white}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ArticleVocabulary;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  vocabContainer: {
    position: "relative",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  vocabTitle: {
    fontSize: 22,
    fontFamily: Fonts.NanumGothicFont.Bold.name,
  },
  vocabSubtitle: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.gray,
    fontFamily: Fonts.NanumGothicFont.Regular.name,
  },
  vocabContent: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "semibold",
  },
  exampleTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "bold",
  },
  exampleContent: {
    marginTop: 14,
    fontSize: 16,
    fontFamily: Fonts.NanumGothicFont.Regular.name,
  },
});
