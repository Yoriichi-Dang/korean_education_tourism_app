import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
type Props = PropsWithChildren<{
  text: string;
  href: string;
}>;

export default function Bottom({ text, href }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Link style={styles.link} href={`./${href}`}>
        {href}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    flex: 1,
  },
  text: {
    color: "gray",
  },
  link: {
    color: Colors.light.primary[200],
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
