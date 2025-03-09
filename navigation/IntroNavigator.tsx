import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const IntroNavigator = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="splash"
        options={{ headerShown: false, title: "Splash" }}
      />
      <Stack.Screen name="intro" options={{ title: "Intro" }} />
    </Stack>
  );
};

export default IntroNavigator;
