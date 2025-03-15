import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Vocabulary } from "@/types/language";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const Card = ({ id, word, romanized, vietnamese, example }: Vocabulary) => {
  const rotateY = useSharedValue(0); // Giá trị xoay ban đầu

  const flipCard = () => {
    rotateY.value = withTiming(rotateY.value === 0 ? 180 : 0, {
      duration: 500,
    });
  };

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotateY.value}deg` }],
      opacity: interpolate(rotateY.value, [0, 90, 180], [1, 0, 1]), // Ẩn mặt trước khi lật
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${rotateY.value - 180}deg` }, // Đảo ngược mặt sau
      ],
      opacity: interpolate(rotateY.value, [0, 90, 180], [0, 1, 1]), // Ẩn mặt sau khi lật
    };
  });

  return (
    <Pressable onPress={flipCard} style={styles.container}>
      {/* Mặt trước */}
      <Animated.View style={[styles.card, styles.front, frontStyle]}>
        <Text style={styles.title}>{word}</Text>
      </Animated.View>

      {/* Mặt sau */}
      <Animated.View style={[styles.card, styles.back, backStyle]}>
        <Text style={styles.title}>{vietnamese}</Text>
        <Text style={styles.subTitle}>{romanized}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.primary[400],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backfaceVisibility: "hidden", // Ẩn mặt sau khi chưa xoay
  },
  front: {
    backgroundColor: Colors.light.primary[400],
  },
  back: {
    backgroundColor: Colors.light.primary[400], // Màu khác cho mặt sau
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.white,
  },
  subTitle: {
    fontSize: 18,
    color: Colors.light.white,
  },
});
