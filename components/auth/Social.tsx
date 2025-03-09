import { PropsWithChildren } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import GoogleIcon from "../icons/Google";

type Props = PropsWithChildren<{
  onPress: () => void;
}>;
export default function Social({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        style={styles.icon}
        name="facebook"
        size={40}
        color="blue"
      />
      <View style={styles.icon}>
        <GoogleIcon width={40} height={40} />
      </View>
      <MaterialIcons style={styles.icon} name="apple" size={40} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    width: "100%",
  },
  icon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    borderColor: "#cccccc",
    borderWidth: 0.5,
  },
});
