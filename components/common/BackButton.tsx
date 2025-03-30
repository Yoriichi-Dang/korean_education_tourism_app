import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import LeftChevron from "../icons/LeftChevron";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
type Props = TouchableOpacityProps & ViewProps;
const BackButton = ({ style, ...props }: Props) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.back();
      }}
      style={[style]}
    >
      <LeftChevron width={24} height={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
