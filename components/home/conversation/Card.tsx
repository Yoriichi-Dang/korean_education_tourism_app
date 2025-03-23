import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
type Props = {
  id: string;
  title: string;
  imageUrl: string;
  onPress: () => void;
};
const Card = ({ id, title, imageUrl, onPress }: Props) => {
  const router = useRouter();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              // router.push(`./(conversation)/${id}`);
            }}
          >
            <FontAwesome
              name="play"
              size={18}
              style={{
                marginLeft: 5,
              }}
              color="black"
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: "100%",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "black",
    marginRight: 15,
  },
  image: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 100,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 15,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
