import { PropsWithChildren } from "react";
import { StyleSheet, View, Text } from "react-native";
type Props = PropsWithChildren<{
  text: string;
}>;
export default function Divider({ text }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}> Or {text} with</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 35,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  text: {
    marginHorizontal: 10,
    color: "gray",
  },
});
