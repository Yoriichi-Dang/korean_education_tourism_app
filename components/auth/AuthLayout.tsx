import { Fragment, PropsWithChildren } from "react";
import { Pressable, StyleSheet, View, Text, SafeAreaView } from "react-native";
import Divider from "./Divider";
import Bottom from "./Bottom";
import Social from "./Social";
import Header from "./Header";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
type Auth = "login" | "register";

type Props = PropsWithChildren<{
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
  bottomText: string;
  typeAuth: Auth;
}>;

export default function AuthLayout({
  typeAuth,
  children,
  title,
  subtitle,
  buttonText,
  onPress,
  bottomText,
}: Props) {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Header title={title} subtitle={subtitle} />
        {children}
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: primaryColor[200],
            },
          ]}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
        {typeAuth === "login" && (
          <View>
            <Divider text={typeAuth} />
            <Social onPress={onPress} />
          </View>
        )}
        <Bottom
          text={bottomText}
          href={typeAuth == "login" ? "register" : "login"}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 60,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubTitle: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    width: "100%",
    padding: 14,
    margin: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
