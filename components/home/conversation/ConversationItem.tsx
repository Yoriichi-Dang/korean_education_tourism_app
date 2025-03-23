import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
type Props = {
  id: string;
  imageUrl: string;
  title: string;
  subTitle: string;
};
const ConversationItem = ({ id, imageUrl, title, subTitle }: Props) => {
  const [isLove, setIsLove] = useState(false);
  return (
    <TouchableOpacity onPress={() => console.log(id)}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
        </View>

        <Pressable onPress={() => setIsLove(!isLove)}>
          {isLove ? (
            <FontAwesome name="heart" size={24} color="black" />
          ) : (
            <FontAwesome name="heart-o" size={24} color="black" />
          )}
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: "#888",
    fontWeight: "semibold",
  },
});
