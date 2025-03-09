import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Header from "@/components/home/Header";
import { images } from "@/constants/Assets";

const HomeScreen = () => {
  const { session } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        username={session?.user.user_metadata.username}
        avatar={images.pochacco[1]}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.secondary[400],
  },
});
