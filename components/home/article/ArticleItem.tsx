import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Article from "@/types/article";
type Props = Article & {
  onPress: () => void;
};
const ArticleItem = ({ id, imagePath, typeArticle, title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.articleContainer}>
        <Image
          source={imagePath as ImageSourcePropType} // Ensure image path is correct
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.subTitlte}>{typeArticle}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleItem;

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  subTitlte: {
    fontSize: 14,
    color: Colors.light.gray,
    fontWeight: 600,
    textTransform: "capitalize",
    marginTop: 10,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: "cover",
    borderRadius: 15,
    marginRight: 10,
  },
  content: {
    fontSize: 14,
    color: "#666",
  },
});
