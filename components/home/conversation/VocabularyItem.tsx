import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Vocabulary } from "@/types";
import { VocabularyAudioContext } from "@/app/_layout";
const VocabularyItem = ({ item }: { item: Vocabulary }) => {
  const vocabAudio = useContext(VocabularyAudioContext);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.word_ko}</Text>
          <Text style={styles.romanized}>[{item.pronunciation}]</Text>
          <Text style={styles.vietnamese}>{item.word_vi}</Text>
          <Text style={styles.exampleTitle}>Example</Text>
          <Text style={styles.example}>{item.example_sentence_ko}</Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: Colors.light.black,
            borderRadius: 10,
          }}
          onPress={(e) => {
            e.stopPropagation();
            if (item.audio_url && vocabAudio) {
              vocabAudio.playVocabularyAudio(item.audio_url);
            }
          }}
        >
          <FontAwesome name="volume-up" size={24} color={Colors.light.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VocabularyItem;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 18,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 20,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  romanized: {
    color: "#6a6a6a",
    fontSize: 16,
    marginBottom: 10,
  },
  vietnamese: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 24,
  },
  example: {
    color: "#fff",
    fontSize: 16,
  },
  exampleTitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
  },
});
