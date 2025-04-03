import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
type Props = {
  avatar: ImageSourcePropType;
  onPress: () => void;
};
const Avatar = ({ avatar, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
    >
      <Image source={avatar} style={styles.container} resizeMode="cover" />
    </Pressable>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    borderRadius: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: Colors.light.secondary[300],
  },
});
