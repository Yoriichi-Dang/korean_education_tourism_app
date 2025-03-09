import { Alert, AppState, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import InputField from "@/components/auth/InputField";
import { supabase } from "@/utils/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }
  return (
    <AuthLayout
      isLoading={loading}
      typeAuth="register"
      title="Create Account"
      subtitle="Fill your information bellow or register with your social account."
      buttonText="Register"
      onPress={signUpWithEmail}
      bottomText="Already have an account?"
    >
      <InputField
        label="Username"
        placeholder="Username"
        onChangeText={(text) => {
          setUsername(text);
        }}
      />

      <InputField
        label="Email"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
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
    </AuthLayout>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
