import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/home/conversation/Header";
const Page = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isLoved, setIsLoved] = useState(false);
  return (
    <BackgroundLayout style={{ paddingHorizontal: 24 }}>
      <Header />
      <Image
        source={{
          uri: "https://image.vietnamnews.vn/uploadvnnews/Article/2019/7/22/26541_b.JPG",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>Conversation 1</Text>
          <Text style={styles.subTitle}>Subtitle</Text>
        </View>
        <Pressable onPress={() => setIsLoved(!isLoved)}>
          {isLoved ? (
            <FontAwesome name="heart" size={24} color="black" />
          ) : (
            <FontAwesome name="heart-o" size={24} color="black" />
          )}
        </Pressable>
      </View>
    </BackgroundLayout>
  );
};

export default Page;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  titleContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
