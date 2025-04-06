import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs, usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

function TabBarIcon(props: {
  size: number;
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome style={{ marginBottom: 1 }} {...props} />;
}

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.light.background,
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.light.tint,
        animation: "none",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Vocabulary",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              size={focused ? size * 1.2 : size}
              name="home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="conversation/index"
        options={{
          title: "Conversation",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              size={focused ? size * 1.1 : size}
              name="comment"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="article/index"
        options={{
          title: "Article",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              size={focused ? size * 1.2 : size}
              name="paper-plane"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="video/index"
        options={{
          title: "Video",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              size={focused ? size * 1.2 : size}
              name="play-circle"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="topic" options={{ href: null }} />
    </Tabs>
  );
};

export default TabLayout;
