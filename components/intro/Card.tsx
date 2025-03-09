import { StyleSheet, Text, View } from "react-native";
import React from "react";
type Props = {
  imagePath: string;
};
const Card = ({ imagePath }: Props) => {
  return (
    <View>
      <Text>Card</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
