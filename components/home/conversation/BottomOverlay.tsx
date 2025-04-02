import React, { useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Ionicons } from "@expo/vector-icons";
import VocabularyItem from "./VocabularyItem";
import { ConversationTrack } from "@/types/conversation";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const INITIAL_HEIGHT = SCREEN_HEIGHT * 0.1; // 10% của màn hình
const STATUS_BAR_HEIGHT = 120; // Chiều cao của status bar + notch
const MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT; // Chiều cao tối đa (để lộ status bar)
const MAX_TRANSLATE_Y = -(MAX_HEIGHT - INITIAL_HEIGHT); // Khoảng dịch chuyển tối đa khi kéo lên
const MIN_TRANSLATE_Y = 0; // Giới hạn tối thiểu là 0 (không kéo nhỏ hơn INITIAL_HEIGHT)

type ContextType = {
  startY: number;
};

const BottomOverlay = ({ item }: { item: ConversationTrack }) => {
  const translateY = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Hàm di chuyển bottom sheet
  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, {
      damping: 50,
      stiffness: 300,
    });
  }, []);

  // Hiển thị sheet ở vị trí mặc định (10%) khi component mount
  useEffect(() => {
    translateY.value = 0;
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: ContextType) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: ContextType) => {
      const newTranslateY = ctx.startY + event.translationY;
      // Giới hạn không kéo nhỏ hơn INITIAL_HEIGHT
      translateY.value = Math.max(
        MAX_TRANSLATE_Y,
        Math.min(MIN_TRANSLATE_Y, newTranslateY)
      );
    },
    onEnd: (event) => {
      if (event.velocityY < -500) {
        // Vuốt lên nhanh - mở rộng hoàn toàn
        scrollTo(MAX_TRANSLATE_Y);
      } else if (event.velocityY > 500) {
        // Vuốt xuống nhanh - luôn trở về vị trí mặc định 10%
        scrollTo(MIN_TRANSLATE_Y);
        // Không dùng runOnJS ở đây, chuyển sang xử lý riêng
      } else {
        // Dựa vào vị trí
        if (translateY.value < MAX_TRANSLATE_Y / 2) {
          // Kéo lên quá nửa đường lên đỉnh - mở rộng hoàn toàn
          scrollTo(MAX_TRANSLATE_Y);
        } else {
          // Ngược lại - về vị trí ban đầu 10%
          scrollTo(MIN_TRANSLATE_Y);
        }
      }
    },
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // Animated style cho icon chevron
  const rChevronStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y, 0],
      [Math.PI, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });

  const handleScrollBeginDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (event.nativeEvent.contentOffset.y <= 0) {
      // Nếu đã scroll lên đầu và tiếp tục vuốt xuống, thu gọn overlay
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      translateY.value = withSpring(MAX_TRANSLATE_Y / 2);
    }
  };

  // Sử dụng translateY để xác định khi nào cho phép scroll
  // Sai số nhỏ để đảm bảo hoạt động đúng
  const isFullyExpanded = Math.abs(translateY.value - MAX_TRANSLATE_Y) < 1;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[styles.bottomSheetContainer, rBottomSheetStyle]}
          pointerEvents="auto"
        >
          <View style={styles.header}>
            <Text style={styles.upNextText}>Vocabulary</Text>
            <Animated.View style={[styles.chevronContainer, rChevronStyle]}>
              <Ionicons name="chevron-up" size={24} color="#666" />
            </Animated.View>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={handleScrollBeginDrag}
            scrollEventThrottle={16}
          >
            {item?.vocabularies.map((i, index) => (
              <VocabularyItem key={index} item={i} />
            ))}
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1000,
    pointerEvents: "box-none",
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#18181b",
    position: "absolute",
    bottom: 0,
    top: SCREEN_HEIGHT - INITIAL_HEIGHT,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  chevronContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 0,
    marginBottom: 8,
  },
  upNextText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 100,
  },
  item: {
    padding: 15,
    backgroundColor: "#27272a",
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BottomOverlay;
