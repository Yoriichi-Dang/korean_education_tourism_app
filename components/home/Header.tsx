import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
type Props = {
  username: string;
  avatar: ImageSourcePropType;
  onPress: () => void;
};
const Header = ({ username, avatar, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {username ? (
          <>
            <Text style={styles.title}>Hello </Text>
            <Text style={styles.subTitle}>, {username}</Text>
          </>
        ) : (
          <Text style={styles.title}>Hello</Text>
        )}
      </View>
      <Avatar avatar={avatar} onPress={onPress} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: Colors.light.secondary[100],
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 22,
    color: Colors.light.secondary[300],
    fontFamily: Fonts.NanumGothicFont.Bold.name,
  },
});
