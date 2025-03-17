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
import Article from "@/types/article";
import { Vocabulary } from "@/types/language";
import ArticleVocabulary from "./ArticleVocabulary";
import { useRouter } from "expo-router";
const ArticleDetail = ({
  id,
  imagePath,
  typeArticle,
  content,
  vocabulary,
  title,
}: Article) => {
  // Render content với các từ vựng được highlight
  const router = useRouter();
  const renderContentWithHighlights = (
    text: string,
    vocabulary: Vocabulary[]
  ) => {
    if (!vocabulary || vocabulary.length === 0) {
      return <Text style={styles.content}>{text}</Text>;
    }

    // Tạo pattern để match tất cả từ vựng (cần escape special characters)
    const wordPatterns = vocabulary.map((item) =>
      item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const pattern = new RegExp(`(${wordPatterns.join("|")})`, "gi");

    // Tách đoạn văn thành các phần dựa trên từ vựng
    const parts = text.split(pattern);

    return (
      <Text style={styles.content}>
        {parts.map((part, index) => {
          const isVocab = vocabulary.some(
            (item) => item.word.toLowerCase() === part.toLowerCase()
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
          source={imagePath as ImageSourcePropType}
          resizeMode="cover"
        />
        <View style={styles.headerContainer}>
          <Text style={styles.subTitle}>{typeArticle}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentTitle}>By Furama</Text>
        {renderContentWithHighlights(content, vocabulary)}
        <View
          style={{
            width: "100%",
            height: 0.5,
            backgroundColor: Colors.light.gray,
            marginVertical: 20,
          }}
        ></View>
        <ArticleVocabulary vocabularies={vocabulary} />
      </ScrollView>
    </View>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    position: "relative",
    height: "55%",
  },
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
