import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, Tabs, usePathname, useRouter } from "expo-router";
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
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          height: 80,
          position: "relative",
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.light.tint,
        animation: "none",
      }}
      tabBar={(props) => {
        // Get the current route state to determine which tab is active
        const state = props.state;

        return (
          <View style={styles.container}>
            <View style={styles.tabBar}>
              {/* First two tabs */}
              <View style={styles.tabSection}>
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => props.navigation.navigate("index")}
                >
                  <TabBarIcon
                    size={state.index === 0 ? 24 * 1.1 : 24}
                    name="graduation-cap"
                    color={state.index === 0 ? Colors.light.tint : "#999"}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      state.index === 0 && styles.activeTabText,
                    ]}
                  >
                    Lesson
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => props.navigation.navigate("article/index")}
                >
                  <TabBarIcon
                    size={state.index === 1 ? 24 * 1.1 : 24}
                    name="newspaper-o"
                    color={state.index === 1 ? Colors.light.tint : "#999"}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      state.index === 1 && styles.activeTabText,
                      { marginHorizontal: 20 },
                    ]}
                  >
                    Article
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Middle large chat button */}
              <TouchableOpacity
                style={[styles.chatButton]}
                onPress={() => router.push("chat")}
              >
                <TabBarIcon size={28} name="comment" color="#fff" />
              </TouchableOpacity>

              {/* Last two tabs */}
              <View style={styles.tabSection}>
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => props.navigation.navigate("forum/index")}
                >
                  <TabBarIcon
                    size={state.index === 2 ? 24 * 1.1 : 24}
                    name="users"
                    color={state.index === 2 ? Colors.light.tint : "#999"}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      state.index === 2 && styles.activeTabText,
                      { marginHorizontal: 20 },
                    ]}
                  >
                    Forum
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => props.navigation.navigate("video/index")}
                >
                  <TabBarIcon
                    size={state.index === 3 ? 24 * 1.1 : 24}
                    name="video-camera"
                    color={state.index === 3 ? Colors.light.tint : "#999"}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      state.index === 4 && styles.activeTabText,
                    ]}
                  >
                    Video
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Lesson", headerShown: false }}
      />
      <Tabs.Screen
        name="article/index"
        options={{ title: "Article", headerShown: false }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{ title: "Chat", headerShown: false }}
      />
      <Tabs.Screen
        name="forum/index"
        options={{ title: "Forum", headerShown: false }}
      />
      <Tabs.Screen
        name="video/index"
        options={{ title: "Video", headerShown: false }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    height: 75,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  tabSection: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
  activeTabText: {
    color: Colors.light.tint,
  },
  chatButton: {
    backgroundColor: Colors.light.tint,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatButtonActive: {
    backgroundColor: Colors.light.tint,
    transform: [{ scale: 1.1 }],
  },
});

export default TabLayout;
