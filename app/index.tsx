import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, RelativePathString } from "expo-router";
import BackgroundLayout from "@/components/common/BackgroundLayout";

const Index = () => {
  return (
    <BackgroundLayout
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"./splash"}>Splash</Link>
    </BackgroundLayout>
  );
};

export default Index;
