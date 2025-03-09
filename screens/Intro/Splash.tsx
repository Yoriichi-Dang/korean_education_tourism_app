import { StyleSheet, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fonts from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { RelativePathString, router } from "expo-router";

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      router.replace("./intro");
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>
        Korism
      </Animated.Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 55,
    color: Colors.light.primary[400],
    fontFamily: Fonts.EBGaramondFont.SemiBold.name,
  },
});
