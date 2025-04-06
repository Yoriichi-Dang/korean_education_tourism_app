import { Linking, Platform, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";

export async function openYoutubeLink(youtubeUrl: string) {
  // Kiểm tra và chuẩn hóa URL
  if (
    !youtubeUrl ||
    (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be"))
  ) {
    Alert.alert("Lỗi", "Đường link không phải là link YouTube hợp lệ");
    return;
  }

  // Tạo URL cho ứng dụng YouTube
  // Chuyển đổi URL từ dạng web sang dạng app
  let youtubeAppUrl = youtubeUrl;

  // Nếu là URL đầy đủ, chuyển từ https:// sang youtube://
  if (youtubeUrl.startsWith("https://")) {
    youtubeAppUrl = youtubeUrl.replace("https://", "youtube://");
  } else if (youtubeUrl.startsWith("http://")) {
    youtubeAppUrl = youtubeUrl.replace("http://", "youtube://");
  }

  // Xử lý URL dạng ngắn (youtu.be)
  if (youtubeUrl.includes("youtu.be")) {
    const videoId = youtubeUrl.split("/").pop();
    youtubeAppUrl = `youtube://www.youtube.com/watch?v=${videoId}`;
  }

  if (Platform.OS === "ios") {
    try {
      // Thử mở trong app YouTube trước
      const supported = await Linking.canOpenURL(youtubeAppUrl);

      if (supported) {
        // Mở trong ứng dụng YouTube nếu có thể
        await Linking.openURL(youtubeAppUrl);
      } else {
        // Fallback: mở trong trình duyệt web
        await WebBrowser.openBrowserAsync(youtubeUrl);
      }
    } catch (error) {
      console.error("Lỗi khi mở YouTube:", error);

      // Thử phương án cuối cùng nếu các cách trên đều thất bại
      try {
        // Mở bằng Safari
        await Linking.openURL(youtubeUrl);
      } catch (err) {
        Alert.alert(
          "Không thể mở YouTube",
          "Không thể mở video YouTube. Vui lòng đảm bảo bạn đã cài đặt ứng dụng YouTube hoặc trình duyệt web.",
          [{ text: "OK" }]
        );
      }
    }
  } else {
    // Logic cho Android
    try {
      const supported = await Linking.canOpenURL(youtubeAppUrl);

      // Mở trong ứng dụng nếu hỗ trợ, ngược lại mở trong trình duyệt
      await Linking.openURL(supported ? youtubeAppUrl : youtubeUrl);
    } catch (error) {
      console.error("Lỗi khi mở YouTube:", error);
      Alert.alert("Lỗi", "Không thể mở video YouTube. Vui lòng thử lại sau.", [
        { text: "OK" },
      ]);
    }
  }
}
