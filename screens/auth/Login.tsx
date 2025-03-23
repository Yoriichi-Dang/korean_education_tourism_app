import { Alert, AppState, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import InputField from "@/components/auth/InputField";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function signInWithEmail() {
    setLoading(true);
    const { error, data }: AuthTokenResponsePassword =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <AuthLayout
      isLoading={loading}
      typeAuth="login"
      title="Login"
      subtitle="Hi! Welcome back, you've been missed!"
      buttonText="Login"
      onPress={signInWithEmail}
      bottomText="Don't have an account?"
    >
      <InputField
        label="Email"
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        placeholder="Password"
        onChangeText={(text) => {
          setPassword(text);
        }}
        isPassword={true}
      />
      <View style={styles.linkWrapper}>
        <Link style={styles.link} href={"/"}>
          Forgot password?
        </Link>
      </View>
    </AuthLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  linkWrapper: {
    alignItems: "flex-end",
  },
  link: {
    color: Colors.light.primary[300],
  },
});
