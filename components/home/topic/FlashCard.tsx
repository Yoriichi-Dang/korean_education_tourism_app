import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
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
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const FlashCard = () => {
  const {
    getCurrentVocab,
    nextVocabulary,
    isFlipped,
    flipCard,
    getCurrentTopic,
    getCurrentVocabIndex,
  } = useFlashCard();
  const [completed, setCompleted] = useState(false);
  const [currentTopicId, setCurrentTopicId] = useState<number | null>(null);

  const currentVocab = getCurrentVocab();

  // Reset completed state whenever the screen gains focus
  useFocusEffect(
    useCallback(() => {
      // Always force an immediate check of the current vocabulary and completed state
      const vocab = getCurrentVocab();
      const currentIndex = getCurrentVocabIndex();

      try {
        const topic = getCurrentTopic();
        // If we have a topic but no vocab, we're at the end
        if (
          topic &&
          topic.vocabulary &&
          currentIndex >= topic.vocabulary.length
        ) {
          setCompleted(true);
        } else if (vocab) {
          // We have a valid vocabulary item
          setCompleted(false);
        } else {
          // No topic or invalid state - reset completed
          setCompleted(false);
        }
      } catch (error) {
        // Error getting topic, reset completed state
        setCompleted(false);
      }

      return () => {
        // Cleanup when screen loses focus
      };
    }, [getCurrentVocab, getCurrentTopic, getCurrentVocabIndex])
  );

  // Reset completed state when topic changes
  useEffect(() => {
    try {
      const currentTopic = getCurrentTopic();
      if (currentTopic && currentTopic.topic_id !== currentTopicId) {
        setCompleted(false);
        setCurrentTopicId(currentTopic.topic_id);
      }
    } catch (error) {
      // No current topic yet, do nothing
      setCompleted(false);
      setCurrentTopicId(null);
    }
  }, [getCurrentTopic, currentTopicId]);

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

  // Clean function to handle next vocabulary - no delay
  const handleNextVocab = useCallback(() => {
    nextVocabulary();
    // Immediate check if there are no more vocabularies
    if (!getCurrentVocab()) {
      setCompleted(true);
    }
    resetCard();
  }, [nextVocabulary, resetCard, getCurrentVocab]);

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

        // Faster animation with withTiming instead of withSpring
        translateX.value = withTiming(direction * width * 1.5, {
          duration: 200,
        });

        translateY.value = withTiming(150, {
          duration: 200,
        });

        cardRotation.value = withTiming(
          direction * 30,
          {
            duration: 200,
          },
          (finished) => {
            if (finished) {
              // Execute immediately without timeout
              runOnJS(handleNextVocab)();
            }
          }
        );
      } else {
        // Spring back to center with improved animation - make this faster too
        translateX.value = withTiming(0, {
          duration: 150,
        });

        translateY.value = withTiming(0, {
          duration: 150,
        });

        cardRotation.value = withTiming(0, {
          duration: 150,
        });
      }
    })
    .simultaneousWithExternalGesture(Gesture.Tap());

  // Improved flip handler
  const handleFlip = () => {
    // Prevent flipping during swipe animation
    if (isAnimating.value || Math.abs(translateX.value) > 10) return;

    const newValue = rotate.value === 0 ? 1 : 0;

    rotate.value = withTiming(
      newValue,
      {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
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
  if (completed) {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/gifs/congratulation.gif")}
          style={styles.congratsImage}
          resizeMode="contain"
        />
      </View>
    );
  }

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
          <Text style={styles.word}>{currentVocab.word_ko}</Text>
          <Text style={styles.romanized}>{currentVocab.pronunciation}</Text>
          <Text style={styles.swipeHint}>
            Vuốt sang trái hoặc phải để chuyển thẻ
          </Text>
        </Animated.View>

        {/* Back side - Vietnamese translation and example */}
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          <Text style={styles.word}>{currentVocab.word_vi}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{currentVocab.part_of_speech}</Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleLabel}>Ví dụ:</Text>
            <Text style={styles.example}>
              {currentVocab.example_sentence_ko}
            </Text>
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
  congratsImage: {
    width: width * 0.8,
    height: height * 0.4,
  },
});
