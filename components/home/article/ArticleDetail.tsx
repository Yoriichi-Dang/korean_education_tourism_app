import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import ArticleVocabulary from "./ArticleVocabulary";
import { useRouter } from "expo-router";
import { ArticleWithVocabulary, Vocabulary } from "@/types";
const ArticleDetail = ({
  image_url,
  title_ko,
  content_ko,
  content_vi,
  vocabulary,
  author_name,
}: Partial<ArticleWithVocabulary>) => {
  // Render content với các từ vựng được highlight
  const router = useRouter();
  const renderContentWithHighlights = (text: string, vocabulary: any[]) => {
    if (!vocabulary || vocabulary.length === 0) {
      return <Text style={styles.content}>{text}</Text>;
    }
    // Tạo pattern để match tất cả từ vựng (cần escape special characters)
    const wordPatterns = vocabulary.map((item) =>
      item.vocab_data.word_ko.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const pattern = new RegExp(`(${wordPatterns.join("|")})`, "gi");

    // Tách đoạn văn thành các phần dựa trên từ vựng
    const parts = text.split(pattern);

    return (
      <Text style={styles.content}>
        {parts.map((part, index) => {
          const isVocab = vocabulary.some(
            (item) =>
              item.vocab_data.word_ko.toLowerCase() === part.toLowerCase()
          );

          if (isVocab) {
            return (
              <Text key={index} style={styles.highlighted}>
                {part}
              </Text>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{ uri: image_url as string }}
          resizeMode="cover"
        />
        <View style={styles.headerContainer}>
          {/* <Text style={styles.subTitle}>{typeArticle}</Text> */}
          <Text style={styles.title}>{title_ko}</Text>
        </View>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{author_name}</Text>
        {renderContentWithHighlights(content_ko as string, vocabulary as any[])}
        <View
          style={{
            width: "100%",
            height: 0.5,
            backgroundColor: Colors.light.gray,
            marginVertical: 20,
          }}
        ></View>
        <Text style={styles.contentTitle}>Translation</Text>
        <Text
          style={[styles.content, { fontFamily: Fonts.Inter.Regular.name }]}
        >
          {content_vi}
        </Text>
        <View
          style={{
            width: "100%",
            height: 0.5,
            backgroundColor: Colors.light.gray,
            marginVertical: 20,
          }}
        ></View>
        <ArticleVocabulary vocabularies={vocabulary as any[]} />
      </ScrollView>
    </View>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  backButton: {
    zIndex: 1,
    position: "absolute",
    top: 60,
    left: 20,
    padding: 12,
    backgroundColor: "gray",
    borderRadius: 100,
    opacity: 0.4,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    position: "relative",
    height: "55%",
  },

  image: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.EBGaramondFont.Bold.name,
    color: "white",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    padding: 10,
    backgroundColor: Colors.light.secondary[200],
    width: 100,
    borderRadius: 20,
    textAlign: "center",
    color: "white",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 8,
  },
  contentContainer: {
    backgroundColor: Colors.light.white,
    padding: 16,
    width: "100%",
    height: "47%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  contentTitle: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: "justify",
    fontFamily: Fonts.NanumGothicFont.Regular.name,
  },
  highlighted: {
    borderRadius: 20,
    letterSpacing: 3,
    backgroundColor: Colors.light.secondary[400],
    color: Colors.light.primary[400],
    fontWeight: "bold",
  },
});
