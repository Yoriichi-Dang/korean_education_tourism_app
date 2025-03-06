// navigation/AuthNavigator.tsx
import { Stack } from "expo-router";

export default function AuthNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ title: "Đăng nhập" }} />
      <Stack.Screen name="register" options={{ title: "Đăng ký" }} />
    </Stack>
  );
}
