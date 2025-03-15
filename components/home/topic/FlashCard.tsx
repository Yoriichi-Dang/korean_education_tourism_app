import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFlashCard } from "@/hooks/useFlashCard";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const FlashCard = () => {
  const {
    getCurrentVocab,
    nextVocabulary,
    isFlipped,
    flipCard,
    getCurrentTopic,
    getCurrentVocabIndex,
  } = useFlashCard();
  const currentVocab = getCurrentVocab();

  const rotate = useSharedValue(isFlipped ? 1 : 0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0); // Add vertical translation
  const cardRotation = useSharedValue(0); // For rotation during swipe
  const { width } = Dimensions.get("window");
  const SWIPE_THRESHOLD = width * 0.3; // Swipe threshold (30% of screen width)

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      // Add slight rotation based on horizontal movement
      cardRotation.value = interpolate(
        event.translationX,
        [-width, 0, width],
        [-15, 0, 15] // Rotate -15 to +15 degrees
      );
    })
    .onEnd((event) => {
      // If swiped far enough, complete the swipe and show next card
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        // Direction of swipe
        const direction = translateX.value > 0 ? 1 : -1;

        // Animate card off screen
        translateX.value = withTiming(direction * width * 1.5, {
          duration: 500,
        });
        translateY.value = withTiming(150, { duration: 500 });
        cardRotation.value = withTiming(
          direction * 30,
          { duration: 500 },
          () => {
            // After animation completes, move to next card and reset position
            runOnJS(nextVocabulary)();
            translateX.value = 0;
            translateY.value = 0;
            cardRotation.value = 0;
          }
        );
      } else {
        // If not swiped far enough, spring back to center
        translateX.value = withSpring(0);
        cardRotation.value = withSpring(0);
      }
    });

  // Function to handle flip animation
  const handleFlip = () => {
    const newValue = rotate.value === 0 ? 1 : 0;
    rotate.value = withTiming(newValue, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(flipCard)();
      }
    });
  };

  // Front side animation style with swipe and flip
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotate.value,
      [0, 1],
      [0, 180],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${cardRotation.value}deg` },
      ],
      backfaceVisibility: "hidden",
      opacity: rotateValue >= 90 ? 0 : 1,
    };
  });

  // Back side animation style with swipe and flip
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotate.value,
      [0, 1],
      [180, 360],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${cardRotation.value}deg` },
      ],
      backfaceVisibility: "hidden",
      position: "absolute",
      opacity: rotateValue >= 270 ? 1 : 0,
    };
  });

  if (currentVocab === undefined || currentVocab === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không có từ vựng</Text>
      </View>
    );
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Pressable style={styles.container} onPress={handleFlip}>
        {/* Front side - Korean word */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.word}>{currentVocab.word}</Text>
          <Text style={styles.romanized}>{currentVocab.romanized}</Text>
          <Text style={styles.swipeHint}>
            Swipe left or right for next card
          </Text>
        </Animated.View>

        {/* Back side - Vietnamese translation and example */}
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          <Text style={styles.word}>{currentVocab.vietnamese}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{currentVocab.type}</Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleLabel}>Ví dụ:</Text>
            <Text style={styles.example}>{currentVocab.example}</Text>
          </View>
          <Text style={styles.swipeHint}>
            Swipe left or right for next card
          </Text>
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
};

export default FlashCard;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  card: {
    width: width * 0.85,
    height: height * 0.45,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBack: {
    backgroundColor: "#f0f8ff",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  romanized: {
    fontSize: 20,
    color: "#666",
    marginBottom: 16,
    fontStyle: "italic",
  },
  typeContainer: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  type: {
    fontSize: 14,
    color: "#333",
  },
  exampleContainer: {
    marginTop: 20,
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  example: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
  },
  swipeHint: {
    position: "absolute",
    bottom: 10,
    color: "#999",
    fontSize: 12,
  },
});
