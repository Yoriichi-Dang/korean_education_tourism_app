import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import AuthNavigator from "@/navigation/AuthNavigator";
import { useAuth } from "@/hooks/useAuth";

const AuthLayout = () => {
  const { session } = useAuth();
  if (session) {
    return <Redirect href="/(tabs)" />;
  }
  return <AuthNavigator />;
};

export default AuthLayout;
