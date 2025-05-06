import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Message } from "@/screens/chat/Chat";
import { Colors } from "@/constants/Colors";
import Markdown from "react-native-markdown-display";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnUI,
  cancelAnimation,
  interpolate,
} from "react-native-reanimated";

const ChatMessage = ({
  item,
  isLatest,
  onTypingComplete,
  onAnimationComplete,
}: {
  item: Message;
  isLatest: boolean;
  onTypingComplete: () => void;
  onAnimationComplete: (id: string) => void;
}) => {
  // Function to detect if content is Markdown
  const isMarkdown = (text: string): boolean => {
    // Simple check for common Markdown patterns
    const markdownPatterns = [
      /[*_~`#]/, // Patterns for formatting, headings
      /\[.*?\]\(.*?\)/, // Links
      /```[\s\S]*?```/, // Code blocks
      /^\s*(?:[-+*]|\d+\.)\s+/m, // Lists
      /\|[^|]+\|[^|]+\|/, // Tables
      /!\[.*?\]\(.*?\)/, // Images
    ];

    return markdownPatterns.some((pattern) => pattern.test(text));
  };

  // Determine if the message content should be parsed as Markdown
  const shouldRenderMarkdown = isMarkdown(item.content);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingProgress = useSharedValue(0);

  // Chỉ áp dụng hiệu ứng khi là tin nhắn mới nhất VÀ là tin nhắn của AI
  const shouldAnimate = isLatest && item.role === "model" && !item.hasAnimated;

  useEffect(() => {
    // Nếu không cần animation, hiển thị text đầy đủ ngay lập tức
    if (!shouldAnimate) {
      setDisplayedText(item.content);
      return;
    }

    setIsTyping(true);
    setDisplayedText("");

    let fullText = item.content;
    let currentIndex = 0;
    const textLength = fullText.length;

    const typeNextChar = () => {
      if (currentIndex < textLength) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        typingProgress.value = currentIndex / textLength;

        // Speed of typing (can be adjusted)
        const typingSpeed = Math.max(10, Math.min(30, 20 - currentIndex / 50));
        setTimeout(typeNextChar, typingSpeed);
      } else {
        setIsTyping(false);
        // Đánh dấu là đã hoàn thành animation
        onAnimationComplete(item.id);
        // Thông báo cho component cha
        onTypingComplete();
      }
    };

    typeNextChar();

    return () => {
      setIsTyping(false);
      cancelAnimation(typingProgress);
    };
  }, [item.content, shouldAnimate, item.id]);

  const typingCursorStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(typingProgress.value % 1, [0, 0.5, 1], [1, 0, 1]),
      height: 16,
      width: 2,
      backgroundColor: "#000",
      marginLeft: 2,
    };
  });

  return (
    <View
      style={[
        styles.messageContainer,
        item.role === "user"
          ? styles.userMessageContainer
          : styles.assistantMessageContainer,
      ]}
    >
      {item.role === "model" && (
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2040/2040653.png",
            }}
            style={styles.avatar}
          />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          item.role === "user" ? styles.userMessage : styles.assistantMessage,
        ]}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {shouldRenderMarkdown ? (
            <Markdown style={markdownStyles}>{displayedText}</Markdown>
          ) : (
            <Text style={styles.messageText}>{displayedText}</Text>
          )}
          {isTyping && <Animated.View style={typingCursorStyle} />}
        </View>
      </View>
    </View>
  );
};
// Markdown specific styles
const markdownStyles = StyleSheet.create({
  // Overall Markdown container
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: "#000",
  },
  // Headings
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  heading2: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 8,
  },
  heading3: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 6,
  },
  heading4: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  heading5: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  heading6: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 2,
  },
  // Links
  link: {
    color: "#0366d6",
    textDecorationLine: "underline",
  },
  // Lists
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  // List items
  list_item: {
    flexDirection: "row",
    marginVertical: 4,
  },
  // Paragraph
  paragraph: {
    marginVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  // Formatting
  strong: {
    fontWeight: "bold",
  },
  em: {
    fontStyle: "italic",
  },
  // Code
  code_inline: {
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  code_block: {
    fontFamily: "monospace",
    backgroundColor: "#f6f8fa",
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
  },
  fence: {
    fontFamily: "monospace",
    backgroundColor: "#f6f8fa",
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
  },
  // Horizontal rule
  hr: {
    backgroundColor: "#e1e4e8",
    height: 1,
    marginVertical: 16,
  },
  // Images
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  // Blockquotes
  blockquote: {
    borderLeftWidth: 0.4,
    borderColor: "#dfe2e5",
    paddingLeft: 10,
    marginLeft: 5,
  },
  // Tables
  table: {
    borderWidth: 1,
    borderColor: "#dfe2e5",
    borderRadius: 3,
    marginVertical: 10,
  },
  thead: {
    backgroundColor: "#f6f8fa",
  },
  tbody: {
    backgroundColor: "#fff",
  },
  th: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#dfe2e5",
  },
  tr: {
    flexDirection: "row",
  },
  td: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#dfe2e5",
  },
});

export default ChatMessage;

const styles = StyleSheet.create({
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-end",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  assistantMessageContainer: {
    justifyContent: "flex-start",
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#efefef",
    borderBottomRightRadius: 5,
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.white,
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
