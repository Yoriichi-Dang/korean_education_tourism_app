import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, RelativePathString } from "expo-router";

const Index = () => {
  return (
    <View style={styles.container}>
      <Link href={"./login"}>Login</Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
