import { sampleConversations } from "@/data/seed";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { ConversationTrack } from "@/types/conversation";
import { useNavigation } from "expo-router";
import { formatDistanceToNow } from "date-fns";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";
import ConversationItem from "./ConversationItem";
import BottomTrack from "./BottomTrack";
import { memo, useCallback } from "react";
// Memo hóa component ConversationItem để tránh re-render không cần thiết
const MemoizedConversationItem = memo(ConversationItem);

export const ConversationListScreen = () => {
  // Sử dụng useCallback để tạo hàm render item chỉ một lần
  const renderConversationItem: ListRenderItem<ConversationTrack> = useCallback(
    ({ item }) => <MemoizedConversationItem item={item} />,
    []
  );

  // Sử dụng keyExtractor để tránh việc tạo key mới mỗi lần render
  const keyExtractor = useCallback((item: ConversationTrack) => item.id, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Conversation</Text>
      <FlatList
        data={sampleConversations}
        renderItem={renderConversationItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        windowSize={21}
        initialNumToRender={10}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
      <BottomTrack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingBottom: 10,
  },
});
