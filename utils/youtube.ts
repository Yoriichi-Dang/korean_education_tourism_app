import { Alert, Linking, Platform } from "react-native";
function openYoutubeVideo(youtubeId: string) {
  // URL YouTube tiêu chuẩn cho trình duyệt
  const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  if (Platform.OS === "ios") {
    // Trên iOS, mở trực tiếp bằng trình duyệt để tránh lỗi LSApplicationQueriesSchemes
    Linking.openURL(youtubeUrl).catch((err) => {
      Alert.alert("Lỗi", "Không thể mở video YouTube. Vui lòng thử lại sau.", [
        { text: "OK" },
      ]);
      console.error("Lỗi khi mở YouTube:", err);
    });
  } else {
    // Trên Android, thử mở bằng ứng dụng trước
    const youtubeAppUrl = `vnd.youtube://${youtubeId}`;

    Linking.canOpenURL(youtubeAppUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(youtubeAppUrl);
        } else {
          return Linking.openURL(youtubeUrl);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Lỗi",
          "Không thể mở video YouTube. Vui lòng thử lại sau.",
          [{ text: "OK" }]
        );
        console.error("Lỗi khi mở YouTube:", err);
      });
  }
}
export default openYoutubeVideo;
