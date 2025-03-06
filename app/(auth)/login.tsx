import { AppState, StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "@/screens/auth/Login";
import { supabase } from "@/utils/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
const Page = () => {
  return <LoginScreen />;
};

export default Page;
