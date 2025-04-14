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
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Colors.light.secondary[300],
  },
});
