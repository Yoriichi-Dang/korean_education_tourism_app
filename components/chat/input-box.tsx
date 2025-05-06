import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const InputBox = ({
  message,
  setMessage,
  sendMessage,
  isLoading,
  disabled,
}: {
  message: string;
  setMessage: (text: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  disabled: boolean;
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          placeholder={disabled ? "Đang trả lời..." : "Ask anything"}
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          editable={!disabled}
        />

        <View style={styles.actionsInInput}>
          <TouchableOpacity
            style={[styles.actionButton, disabled && styles.disabledButton]}
            disabled={disabled}
          >
            <Feather
              name="paperclip"
              size={20}
              color={disabled ? "#ccc" : "#999"}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.actionButton}>
            <Feather name="smile" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bulb-outline" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="more-horizontal" size={20} color="#999" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              styles.sendButton,
              (disabled || isLoading) && styles.disabledSendButton,
            ]}
            onPress={sendMessage}
            disabled={disabled || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Feather name="arrow-up" size={16} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.disclaimer}>
        AI can make mistakes. Please double-check responses.
      </Text>
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: "#F5F5F5",
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: 40,
    paddingVertical: 8,
  },
  actionsInInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginHorizontal: 2,
  },
  sendButton: {
    backgroundColor: "#000",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  disclaimer: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 12,
  },
  disabledInput: {
    color: "#999",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledSendButton: {
    backgroundColor: "#666",
  },
});
