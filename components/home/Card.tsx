import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { TopicWithCount } from "@/services/topic-services";

const Card = ({ item }: { item: TopicWithCount }) => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        router.replace(`/topic/${item.topic_id}`);
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
            {item.topic_name_ko}
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
            {item.topic_name_vi}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          {item.vocab_count > 0 && (
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
              {item.vocab_count} words
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
    fontSize: 18,
    fontFamily: Fonts.EBGaramondFont.SemiBold.name,

    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: Fonts.Inter.Medium.name,
    color: Colors.light.text[100],
  },
  descriptionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.Inter.Regular.name,
    color: Colors.light.text[100],
  },
});
