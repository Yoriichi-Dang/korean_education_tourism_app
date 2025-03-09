import { Fragment, PropsWithChildren } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  useColorScheme,
} from "react-native";
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
  isLoading: boolean;
  typeAuth: Auth;
}>;

export default function AuthLayout({
  typeAuth,
  children,
  title,
  subtitle,
  buttonText,
  onPress,
  isLoading = false,
  bottomText,
}: Props) {
  const primaryColor = useThemeColor("light", "primary");
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.light.background }]}
    >
      <View style={styles.wrapper}>
        <Header title={title} subtitle={subtitle} />
        <View style={styles.childContainer}>{children}</View>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: primaryColor[200],
            },
          ]}
          onPress={onPress}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
        {typeAuth === "login" && (
          <View style={styles.socialContainer}>
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
    paddingHorizontal: 30,
    marginTop: 80,
    alignItems: "center",
  },
  button: {
    width: "100%",
    padding: 14,
    margin: 10,
    borderRadius: 25,
  },
  childContainer: {
    width: "100%",
    gap: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  socialContainer: {
    width: "100%",
    alignItems: "center",
  },
});
