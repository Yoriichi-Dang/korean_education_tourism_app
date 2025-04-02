import React, { useRef, useEffect } from "react";
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
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const INITIAL_HEIGHT = SCREEN_HEIGHT * 0.1; // 10% của màn hình (theo code bạn chia sẻ)
const STATUS_BAR_HEIGHT = 120; // Chiều cao của status bar + notch
const MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT; // Chiều cao tối đa (để lộ status bar)
const MAX_TRANSLATE_Y = -(MAX_HEIGHT - INITIAL_HEIGHT); // Khoảng dịch chuyển tối đa khi kéo lên
const MIN_TRANSLATE_Y = 0; // Giới hạn tối thiểu là 0 (không kéo nhỏ hơn INITIAL_HEIGHT)

type ContextType = {
  startY: number;
};

const BottomOverlay = () => {
  const translateY = useSharedValue(0);
  const isFullyExpanded = useSharedValue(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { currentTrack } = useAudioPlayer();

  // Hàm di chuyển bottom sheet
  const scrollTo = (destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, {
      damping: 50,
      stiffness: 300,
    });
    isFullyExpanded.value = destination === MAX_TRANSLATE_Y;
  };

  // Hiển thị sheet ở vị trí mặc định (10%) khi component mount
  useEffect(() => {
    scrollTo(0);
  }, []);

  // Cập nhật trạng thái isFullyExpanded dựa trên translateY
  useAnimatedReaction(
    () => translateY.value,
    (currentValue) => {
      isFullyExpanded.value = currentValue === MAX_TRANSLATE_Y;
    }
  );

  // Hàm reset vị trí scroll
  const resetScroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  };

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
        runOnJS(resetScroll)();
      } else {
        // Dựa vào vị trí
        if (translateY.value < MAX_TRANSLATE_Y / 2) {
          // Kéo lên quá nửa đường lên đỉnh - mở rộng hoàn toàn
          scrollTo(MAX_TRANSLATE_Y);
        } else {
          // Ngược lại - về vị trí ban đầu 10%
          scrollTo(MIN_TRANSLATE_Y);
          runOnJS(resetScroll)();
        }
      }
    },
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleScrollBeginDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    // Chỉ cho phép thu gọn sheet nếu đang ở đầu nội dung scroll
    if (
      event.nativeEvent.contentOffset.y <= 0 &&
      translateY.value === MAX_TRANSLATE_Y
    ) {
      scrollTo(MAX_TRANSLATE_Y / 2);
    }
  };

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[styles.bottomSheetContainer, rBottomSheetStyle]}
          pointerEvents="auto"
        >
          <View style={styles.line} />

          <View style={styles.header}>
            <Text style={styles.upNextText}>Up next</Text>
            {currentTrack && (
              <Text style={styles.nowPlayingText}>
                Now playing: {currentTrack.title}
              </Text>
            )}
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={isFullyExpanded.value}
            onScrollBeginDrag={handleScrollBeginDrag}
            scrollEventThrottle={16}
          >
            {/* Danh sách mục như trong hình ảnh mẫu */}
            {Array.from({ length: 13 }).map((_, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemText}>Item {index + 1}</Text>
              </View>
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
    zIndex: 1000, // Đảm bảo overlay đè lên các phần tử khác
    pointerEvents: "box-none", // Cho phép tương tác với các phần tử UI bên dưới phần trong suốt
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT, // Chiều cao toàn màn hình để không hở phía dưới
    width: "100%",
    backgroundColor: "#18181b",
    position: "absolute",
    bottom: 0, // Bắt đầu từ đáy màn hình
    top: SCREEN_HEIGHT - INITIAL_HEIGHT, // Vị trí ban đầu (hiển thị 10%)
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
    // Không có pointerEvents ở đây để cho phép tương tác với nội dung overlay
  },
  line: {
    width: 35,
    height: 4,
    backgroundColor: "gray",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 2,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 0, // Loại bỏ đường viền dưới
    marginBottom: 8,
  },
  upNextText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  nowPlayingText: {
    color: "#a1a1aa",
    fontSize: 14,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 100, // Thêm padding bottom lớn hơn để đảm bảo nội dung cuối cùng không bị che khuất
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
