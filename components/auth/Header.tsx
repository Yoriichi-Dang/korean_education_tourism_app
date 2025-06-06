import { View, Text, StyleSheet } from "react-native";
type Props = {
  title: string;
  subtitle: string;
};
export default function Header({ title, subtitle }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubTitle}>{subtitle}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "85%",
    marginBottom: 50,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerSubTitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});
