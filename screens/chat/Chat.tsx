import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import InputBox from "@/components/chat/input-box";
import BackButton from "@/components/common/BackButton";
import ChatMessage from "@/components/chat/chat-message";
import { getChatResponse } from "@/services/chat-service";
import WriteIcon from "@/components/icons/Write";

export type Message = {
  id: string;
  content: string;
  role: "user" | "model";
  timestamp: string;
  hasAnimated?: boolean;
};

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTypingEffect, setIsTypingEffect] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      // Delay scrolling to ensure rendering is complete
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200); // Increased timeout for better reliability
    }
  }, [messages]);

  // Function to send a message
  const sendMessage = async () => {
    if (message.trim() === "" || isTypingEffect) return;

    // Tạo userMessage mới
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    } as Message;

    // Cập nhật tin nhắn trong state
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Tạo userPrompt bằng cách nối tất cả tin nhắn cũ và đánh số
    const userPrompt = messages
      .filter((msg) => msg.role === "user") // Lọc chỉ lấy tin nhắn của user
      .map((msg, index) => `${index + 1}. ${msg.content}`) // Đánh số thứ tự
      .concat(
        `${
          messages.filter((msg) => msg.role === "user").length + 1
        }. ${message}`
      ) // Thêm tin nhắn mới
      .join("\n\n"); // Nối với nhau, có 2 dòng trống giữa các tin nhắn

    setMessage("");
    setLoading(true);

    try {
      const content = await getChatResponse(userPrompt);

      // Bắt đầu hiệu ứng gõ chữ
      setIsTypingEffect(true);

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: content || "",
        role: "model",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        hasAnimated: false,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      // Scroll to bottom after receiving response
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Đảm bảo tắt hiệu ứng gõ khi có lỗi
      setIsTypingEffect(false);
    } finally {
      setLoading(false);
    }
  };

  // Manual scroll handler
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  // Hàm callback khi hiệu ứng gõ hoàn thành
  const handleTypingComplete = () => {
    setIsTypingEffect(false);
  };

  // Hàm này sẽ được gọi khi hiệu ứng hoàn tất để đánh dấu tin nhắn đã chạy animation
  const handleAnimationComplete = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, hasAnimated: true } : msg
      )
    );
  };

  return (
    <BackgroundLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <BackButton style={styles.backButton} />
            <TouchableOpacity onPress={() => setMessages([])}>
              <WriteIcon width={27} height={27} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {messages.length == 0 ? (
              <View style={styles.emptyMessage}>
                <Text style={styles.emptyMessageText}>도와드릴까요?</Text>
              </View>
            ) : (
              <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item, index }) => (
                  <ChatMessage
                    item={item}
                    isLatest={
                      index === messages.length - 1 && item.role === "model"
                    }
                    onTypingComplete={handleTypingComplete}
                    onAnimationComplete={handleAnimationComplete}
                  />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                onContentSizeChange={scrollToBottom}
                onLayout={scrollToBottom}
                removeClippedSubviews={false}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={21}
                maintainVisibleContentPosition={{
                  minIndexForVisible: 0,
                  autoscrollToTopThreshold: 10,
                }}
                showsVerticalScrollIndicator={true}
              />
            )}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <InputBox
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isLoading={loading}
        disabled={isTypingEffect}
      />
    </BackgroundLayout>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  backButton: {
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  emptyMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessageText: {
    fontSize: 40,
    fontWeight: "semibold",
    color: "gray",
    fontFamily: "EBGaramond",
  },
});
