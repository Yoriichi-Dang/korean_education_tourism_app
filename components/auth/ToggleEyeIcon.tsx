import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import EyeIcon from "../icons/Eye";
import EyeOffIcon from "../icons/EyeOff";
type Props = {
  isHidden: boolean;
  onPress: () => void;
};
const ToggleEyeIcon = ({ isHidden, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isHidden ? (
        <EyeOffIcon width={24} height={24} />
      ) : (
        <EyeIcon width={24} height={24} />
      )}
    </TouchableOpacity>
  );
  11;
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
  },
});

export default ToggleEyeIcon;
