import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
type Props = {
  titles: string[];
};
const Filter = ({ titles }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      contentContainerStyle={{
        gap: 12,
      }}
      style={styles.container}
    >
      {titles.map((item, index) => (
        <Pressable
          onPress={() => {
            setSelectedIndex(
              selectedIndex.includes(index)
                ? selectedIndex.filter((i) => i !== index)
                : [...selectedIndex, index]
            );
          }}
          key={index}
          style={() => [
            styles.item,
            {
              backgroundColor: selectedIndex.includes(index)
                ? Colors.light.primary[200]
                : Colors.light.primary[100],
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: selectedIndex.includes(index)
                  ? Colors.light.white
                  : Colors.light.text,
              },
            ]}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    maxHeight: 40,
  },
  item: {
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 2,
    backgroundColor: Colors.light.primary[100],
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "semibold",
  },
});
