import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useFlashCard } from "@/hooks/useFlashCard";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
  withSpring,
  cancelAnimation,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

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

  // Animation values
  const rotate = useSharedValue(isFlipped ? 1 : 0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardRotation = useSharedValue(0);
  const isAnimating = useSharedValue(false); // Flag to prevent multiple animations

  const { width } = Dimensions.get("window");
  const SWIPE_THRESHOLD = width * 0.3;

  // Reset all animations and values
  const resetCard = useCallback(() => {
    translateX.value = 0;
    translateY.value = 0;
    cardRotation.value = 0;
    rotate.value = 0;
    isAnimating.value = false;
  }, [translateX, translateY, cardRotation, rotate, isAnimating]);

  // Clean function to handle next vocabulary
  const handleNextVocab = useCallback(() => {
    nextVocabulary();
    resetCard();
  }, [nextVocabulary, resetCard]);

  // Pan gesture for swipe
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // Don't start new gesture if already animating
      if (isAnimating.value) return false;
    })
    .onUpdate((event) => {
      if (isAnimating.value) return;

      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.3;
      cardRotation.value = interpolate(
        event.translationX,
        [-width, 0, width],
        [-15, 0, 15]
      );
    })
    .onEnd((event) => {
      if (isAnimating.value) return;

      if (
        Math.abs(translateX.value) > SWIPE_THRESHOLD ||
        Math.abs(event.velocityX) > 800
      ) {
        isAnimating.value = true;
        const direction = translateX.value > 0 ? 1 : -1;

        // Animate card off screen
        translateX.value = withSpring(direction * width * 1.5, {
          velocity: event.velocityX,
          damping: 50,
          stiffness: 100,
        });

        translateY.value = withSpring(150, {
          velocity: event.velocityY,
          damping: 50,
          stiffness: 100,
        });

        cardRotation.value = withSpring(
          direction * 30,
          {
            velocity: event.velocityX * 0.1,
            damping: 50,
            stiffness: 100,
          },
          (finished) => {
            if (finished) {
              // Use a small timeout to ensure the animation completes properly
              runOnJS(setTimeout)(handleNextVocab, 10);
            }
          }
        );
      } else {
        // Spring back to center with improved animation
        translateX.value = withSpring(0, {
          velocity: event.velocityX,
          damping: 20,
          stiffness: 300,
          mass: 0.8,
        });

        translateY.value = withSpring(0, {
          velocity: event.velocityY,
          damping: 20,
          stiffness: 300,
          mass: 0.8,
        });

        cardRotation.value = withSpring(0, {
          velocity: event.velocityX * 0.1,
          damping: 20,
          stiffness: 300,
          mass: 0.8,
        });
      }
    })
    .simultaneousWithExternalGesture(Gesture.Tap());

  // Improved flip handler
  const handleFlip = () => {
    // Prevent flipping during swipe animation
    if (isAnimating.value || Math.abs(translateX.value) > 10) return;

    const newValue = rotate.value === 0 ? 1 : 0;

    rotate.value = withSpring(
      newValue,
      {
        damping: 15,
        stiffness: 120,
        mass: 1.2,
        overshootClamping: false,
      },
      (finished) => {
        if (finished) {
          runOnJS(flipCard)();
        }
      }
    );
  };

  // Optimized front animation style
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotate.value,
      [0, 1],
      [0, 180],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { perspective: 1200 },
        { rotateY: `${rotateValue}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${cardRotation.value}deg` },
      ],
      backfaceVisibility: "hidden",
      opacity: interpolate(
        rotateValue,
        [0, 89, 90, 180],
        [1, 1, 0, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  // Optimized back animation style
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotate.value,
      [0, 1],
      [180, 360],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { perspective: 1200 },
        { rotateY: `${rotateValue}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${cardRotation.value}deg` },
      ],
      backfaceVisibility: "hidden",
      position: "absolute",
      opacity: interpolate(
        rotateValue,
        [180, 269, 270, 360],
        [0, 0, 1, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  // Handle empty state
  if (!currentVocab) {
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
            Vuốt sang trái hoặc phải để chuyển thẻ
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
            Vuốt sang trái hoặc phải để chuyển thẻ
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
