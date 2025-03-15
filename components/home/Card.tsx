import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
type Props = {
  id: string;
  hangul: string;
  romanized: string;
  vietnamese: string;
  english: string;
  numberVocabs: number;
};
const Card = ({
  id,
  hangul,
  romanized,
  vietnamese,
  english,
  numberVocabs = 0,
}: Props) => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        router.replace(`/topic/${id}`);
      }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed
            ? Colors.light.primary[400]
            : Colors.light.primary[100],
        }, // Giảm opacity khi nhấn
      ]}
    >
      <View style={styles.content}>
        <View>
          <Text
            style={[
              styles.title,
              {
                color: isPressed
                  ? Colors.light.primary[100]
                  : Colors.light.black,
              },
            ]}
          >
            {hangul}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {
                color: isPressed
                  ? Colors.light.primary[100]
                  : Colors.light.black,
              },
            ]}
          >
            {english}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          {numberVocabs > 0 && (
            <Text
              style={[
                styles.description,
                {
                  color: isPressed
                    ? Colors.light.primary[100]
                    : Colors.light.black,
                },
              ]}
            >
              {numberVocabs} words
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 140,
    backgroundColor: Colors.light.primary[100],
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
  },

  content: {
    marginTop: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.NanumGothicFont.Bold.name,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 13,
    fontFamily: Fonts.NanumGothicFont.Regular.name,
    color: Colors.light.text[100],
  },
  descriptionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.NanumGothicFont.Regular.name,
    color: Colors.light.text[100],
  },
});
