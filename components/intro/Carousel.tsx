import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
  FlatList,
  Dimensions,
  Image,
  ImageSourcePropType,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

type Props = {
  imagesPath: ImageSourcePropType[];
};

const Carousel = ({ imagesPath }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scale = useSharedValue(1); // Initial scale is 1 (normal size)
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < imagesPath.length) {
      scale.value = withSpring(1.2, { damping: 5, stiffness: 100 }); // Zoom in (scale to 1.2)
      return () => {
        scale.value = 1;
      };
    }
  }, [currentIndex, imagesPath.length]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<ImageSourcePropType>) => {
    const isCurrentSlide = index === currentIndex;

    return (
      <View style={styles.slide}>
        {isCurrentSlide ? (
          <Animated.Image
            source={item}
            style={[styles.image, animatedStyle]}
            resizeMode="contain"
          />
        ) : (
          <Image source={item} style={styles.image} resizeMode="contain" />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={imagesPath}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item, index) => index.toString()}
        snapToInterval={width} // Each item has width equal to screen width
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    height: 450,
    width: width,
  },
  image: {
    width: "80%",
    height: "100%",
  },
  pagination: {
    fontSize: 18,
    marginTop: 20,
  },
});
