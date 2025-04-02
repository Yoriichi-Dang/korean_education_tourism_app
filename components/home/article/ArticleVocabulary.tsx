import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Vocabulary } from "@/types/language";
import Fonts from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
type Props = {
  vocabularies: Vocabulary[];
};
const ArticleVocabulary = ({ vocabularies }: Props) => {
  if (vocabularies.length === 0) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>Vocabulary</Text>
      {vocabularies.map((item, index) => (
        <TouchableOpacity
          onPress={() => {}}
          key={index}
          style={styles.vocabContainer}
        >
          <View>
            <Text style={styles.vocabTitle}>{item.word}</Text>
            <Text style={styles.vocabSubtitle}>[{item.romanized}]</Text>
            <Text style={styles.vocabContent}>{item.vietnamese}</Text>
            <Text style={styles.exampleTitle}>Examples</Text>
            <Text style={styles.exampleContent}>{item.example}</Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: Colors.light.black,
              borderRadius: 6,
            }}
            onPress={(e) => {
              e.stopPropagation();
              console.log("Speak vocabulary");
            }}
          >
            <FontAwesome
              name="volume-up"
              size={24}
              color={Colors.light.white}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
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
