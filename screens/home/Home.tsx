import {
  FlatList,
  SafeAreaViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Header from "@/components/home/Header";
import { images } from "@/constants/Assets";
import Banner from "@/components/home/Banner";
import Card from "@/components/home/Card";
import { travelTopics } from "@/data/seed";
import BackgroundLayout from "@/components/common/BackgroundLayout";

const HomeScreen = () => {
  const { session } = useAuth();
  return (
    <BackgroundLayout>
      <Header
        username={session?.user.user_metadata.username}
        avatar={images.avatar}
        onPress={() => {}}
      />
      <View style={styles.wrapper}>
        <Banner />
        <Text style={styles.contentTitle}>Topic</Text>
      </View>
      <FlatList
        data={travelTopics}
        numColumns={2} // 2 columns
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.wrapper}
        columnWrapperStyle={styles.row} // Ensures even spacing
        renderItem={({ item }) => (
          <Card
            id={item.id}
            hangul={item.hangul}
            romanized={item.romanized}
            vietnamese={item.vietnamese}
            english={item.english}
            numberVocabs={item.vocabulary.length}
          />
        )}
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
