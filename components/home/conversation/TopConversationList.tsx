import { sampleConversations } from "@/data/seed";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Conversation } from "@/types";
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
  ActivityIndicator,
} from "react-native";
import ConversationItem from "./ConversationItem";
import BottomTrack from "./BottomTrack";
import { memo, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "@/services/conversation-service";
import { useIsFocused } from "@react-navigation/native";
// Memo hóa component ConversationItem để tránh re-render không cần thiết

export const TopConversationList = () => {
  const isFocused = useIsFocused();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
    enabled: isFocused, // Chỉ fetch khi màn hình đang được focus
  });

  // Force refetch khi màn hình được focus lại
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ConversationItem item={item} />}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  listContent: {
    paddingBottom: 10,
  },
});
