import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { images } from "@/constants/Assets";
import { FontAwesome } from "@expo/vector-icons";

const Banner = () => {
  return (
    <View style={styles.banner}>
      <View>
        <Text style={styles.title}>Find Topic</Text>
        <Text style={styles.subTitle}>You want to learn</Text>
      </View>
      <View style={styles.containerSearch}>
        <FontAwesome
          name="search"
          size={20}
          color={Colors.light.primary[200]}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.light.primary[200]}
          placeholder="Search..."
        />
      </View>
      <Image
        style={styles.image}
        source={images.pochacco[1]}
        resizeMode="contain"
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  banner: {
    position: "relative",
    height: 150,
    backgroundColor: Colors.light.primary[200],
    borderRadius: 20,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.light.primary[100],
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.primary[100],
  },
  image: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 120,
    height: 140,
  },
  containerSearch: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "70%",
    padding: 12,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingLeft: 10,
    fontSize: 16,
    color: Colors.light.primary[200],
  },
});
