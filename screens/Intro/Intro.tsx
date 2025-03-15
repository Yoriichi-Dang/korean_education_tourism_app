import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { images } from "@/constants/Assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Carousel from "@/components/intro/Carousel";
import { router } from "expo-router";
import BackgroundLayout from "@/components/common/BackgroundLayout";

const IntroScreen = () => {
  return (
    <BackgroundLayout style={styles.container}>
      <Carousel
        imagesPath={[
          images.pochacco[1],
          images.pochacco[3],
          images.pochacco[5],
          images.pochacco[4],
        ]}
      />
      <Text style={styles.title}>Learning Korean</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      </Text>
      <Pressable onPress={() => router.push("../login")} style={styles.button}>
        <Text style={styles.buttonText}>Get started</Text>
      </Pressable>
    </BackgroundLayout>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    width: 300,
    fontSize: 16,
    fontWeight: "normal",
    color: "gray",
    textAlign: "center",
    marginBottom: 80,
  },
  button: {
    backgroundColor: Colors.light.primary[200],
    padding: 20,
    borderRadius: 16,
    width: 300,
    marginBottom: 180,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
