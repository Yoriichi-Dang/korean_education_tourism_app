import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
type Props = PropsWithChildren<{
  style?: React.ComponentProps<typeof View>["style"];
}>;
const BackgroundLayout = ({ children, style }: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={["top"]}>
      {children}
    </SafeAreaView>
  );
};

export default BackgroundLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
