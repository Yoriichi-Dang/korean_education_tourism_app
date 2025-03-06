import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";

const LoginScreen = () => {
  return (
    <AuthLayout
      typeAuth="login"
      title="Welcome back"
      subtitle="Log in to your account"
      buttonText="Login"
      onPress={() => {}}
      bottomText="Don't have an account?"
    ></AuthLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
