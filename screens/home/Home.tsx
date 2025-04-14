import {
  FlatList,
  SafeAreaViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Header from "@/components/home/Header";
import { images } from "@/constants/Assets";
import Banner from "@/components/home/Banner";
import Card from "@/components/home/Card";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import {
  getTopicsWithCount,
  searchTopics,
  TopicWithCount,
} from "@/services/topic-services";

const HomeScreen = () => {
  const { session } = useAuth();
  const [topics, setTopics] = useState<TopicWithCount[]>([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await getTopicsWithCount();
      setTopics(topics);
    };
    fetchTopics();
  }, []);
  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      const topics = await getTopicsWithCount();
      setTopics(topics);
    } else {
      const topics = await searchTopics(searchTerm);
      setTopics(topics);
    }
  };
  return (
    <BackgroundLayout>
      <Header
        username={session?.user.user_metadata.username}
        avatar={images.thuongAvatar}
        onPress={() => {}}
      />
      <View style={styles.wrapper}>
        <Banner onSearch={handleSearch} />
        <Text style={styles.contentTitle}>Topic</Text>
      </View>
      <FlatList
        data={topics}
        numColumns={2} // 2 columns
        keyExtractor={(item) => item.topic_id.toString()}
        contentContainerStyle={styles.wrapper}
        columnWrapperStyle={styles.row} // Ensures even spacing
        renderItem={({ item }) => <Card item={item} />}
      />
    </BackgroundLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  wrapper: {
    paddingHorizontal: 16,
    width: "100%",
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-between", // Ensures equal space between items
    gap: 10,
  },
});
