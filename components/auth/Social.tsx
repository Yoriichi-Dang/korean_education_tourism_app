import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, StyleSheet } from "react-native";

type Props = PropsWithChildren<{
  onPress: () => void;
}>;
export default function Social({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="facebook" size={24} color="blue" />
      <MaterialIcons name="email" size={24} color="red" />
      <MaterialIcons name="apple" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
});
