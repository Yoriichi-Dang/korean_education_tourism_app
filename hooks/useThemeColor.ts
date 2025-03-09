/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColor(
  props: "light" | "dark",
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  return Colors[props][colorName];
}
