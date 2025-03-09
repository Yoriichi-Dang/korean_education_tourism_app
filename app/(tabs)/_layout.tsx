import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

function TabBarIcon(props: {
  size: number;
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
        name="conversation"
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
        name="article"
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
        name="video"
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
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
