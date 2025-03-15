import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const TopicStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Topic" }} />
    </Stack>
  );
};

export default TopicStack;

const styles = StyleSheet.create({});
