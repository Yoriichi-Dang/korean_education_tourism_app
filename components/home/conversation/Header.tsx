import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ArrowLeft from "@/components/icons/ArrowLeft";
import DotMore from "@/components/icons/DotMore";
const Header = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <ArrowLeft width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Now Playing</Text>
      <TouchableOpacity onPress={() => {}}>
        <DotMore width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
