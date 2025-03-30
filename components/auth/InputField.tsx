import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import EyeIcon from "../icons/Eye";
import EyeOffIcon from "../icons/EyeOff";
import ToggleEyeIcon from "./ToggleEyeIcon";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useThemeColor } from "@/hooks/useThemeColor";
type Props = TextInputProps & {
  label: string;
  isPassword?: boolean;
};
const InputField = ({ label, isPassword = false, ...props }: Props) => {
  const secondary: any = useThemeColor("light", "secondary");
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordHidden(!isPasswordHidden);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: secondary[400],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          secureTextEntry={isPasswordHidden && isPassword}
          placeholderTextColor={"gray"}
          autoCapitalize="none"
        />
        {isPassword && (
          <ToggleEyeIcon
            isHidden={isPasswordHidden}
            onPress={togglePasswordVisibility}
          />
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 3,
    position: "relative",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 0,
  },
});
