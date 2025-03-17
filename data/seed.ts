import Article from "@/types/article";
import { TravelTopic } from "@/types/language";

const travelTopics: TravelTopic[] = [
  {
    id: "1",
    romanized: "gyotong sudan",
    hangul: "교통수단",
    vietnamese: "Phương tiện di chuyển",
    english: "Means of transportation",
    vocabulary: [
      {
        id: "1-1",
        word: "버스",
        romanized: "beoseu",
        vietnamese: "Xe buýt",
        example:
          "버스를 어디에서 탈 수 있나요? (Tôi có thể đón xe buýt ở đâu?)",
        type: "Danh từ",
      },
      {
        id: "1-2",
        word: "기차",
        romanized: "gicha",
        vietnamese: "Tàu hỏa",
        example: "기차를 타고 서울에 가요. (Tôi đi Seoul bằng tàu hỏa.)",
        type: "Danh từ",
      },
      {
        id: "1-3",
        word: "비행기",
        romanized: "bihaenggi",
        vietnamese: "Máy bay",
        example: "비행기로 제주도에 갈 거예요. (Tôi sẽ đi Jeju bằng máy bay.)",
        type: "Danh từ",
      },
      {
        id: "1-4",
        word: "택시",
        romanized: "taeksi",
        vietnamese: "Taxi",
        example: "택시를 불러 주세요. (Hãy gọi taxi giúp tôi.)",
        type: "Danh từ",
      },
      {
        id: "1-5",
        word: "타다",
        romanized: "tada",
        vietnamese: "Lên, đi (phương tiện)",
        example: "버스를 탔어요. (Tôi đã lên xe buýt.)",
        type: "Động từ",
      },
    ],
  },
  {
    id: "2",
    romanized: "hotel mit sukso",
    hangul: "호텔 및 숙소",
    vietnamese: "Khách sạn và chỗ ở",
    english: "Hotels and accommodation",
    vocabulary: [
      {
        id: "2-1",
        word: "호텔",
        romanized: "hotel",
        vietnamese: "Khách sạn",
        example: "이 호텔은 깨끗해요. (Khách sạn này sạch sẽ.)",
        type: "Danh từ",
      },
      {
        id: "2-2",
        word: "방",
        romanized: "bang",
        vietnamese: "Phòng",
        example: "방이 몇 개 있나요? (Có bao nhiêu phòng?)",
        type: "Danh từ",
      },
      {
        id: "2-3",
        word: "예약",
        romanized: "yeyak",
        vietnamese: "Đặt phòng",
        example: "호텔을 미리 예약했어요. (Tôi đã đặt phòng khách sạn trước.)",
        type: "Danh từ",
      },
      {
        id: "2-4",
        word: "체크인하다",
        romanized: "chekeu-inhada",
        vietnamese: "Nhận phòng",
        example:
          "오후 2시에 체크인할 수 있어요. (Bạn có thể nhận phòng lúc 2 giờ chiều.)",
        type: "Động từ",
      },
      {
        id: "2-5",
        word: "체크아웃하다",
        romanized: "chekeu-outhada",
        vietnamese: "Trả phòng",
        example:
          "체크아웃은 오전 11시까지입니다. (Bạn phải trả phòng trước 11 giờ sáng.)",
        type: "Động từ",
      },
    ],
  },
  {
    id: "3",
    romanized: "yumyung gwangwangji",
    hangul: "유명 관광지",
    vietnamese: "Địa điểm du lịch nổi tiếng",
    english: "Famous tourist spots",
    vocabulary: [
      {
        id: "3-1",
        word: "명소",
        romanized: "myeongso",
        vietnamese: "Danh lam thắng cảnh",
        example:
          "서울의 명소는 어디인가요? (Địa điểm nổi tiếng ở Seoul là gì?)",
        type: "Danh từ",
      },
      {
        id: "3-2",
        word: "박물관",
        romanized: "bakmulgwan",
        vietnamese: "Bảo tàng",
        example:
          "이 박물관은 역사적이에요. (Bảo tàng này có nhiều giá trị lịch sử.)",
        type: "Danh từ",
      },
      {
        id: "3-3",
        word: "궁전",
        romanized: "gungjeon",
        vietnamese: "Cung điện",
        example:
          "경복궁은 가장 유명한 궁전이에요. (Gyeongbokgung là cung điện nổi tiếng nhất Hàn Quốc.)",
        type: "Danh từ",
      },
      {
        id: "3-4",
        word: "사원",
        romanized: "sawon",
        vietnamese: "Ngôi đền",
        example:
          "이 사원은 조용하고 아름다워요. (Ngôi đền này yên tĩnh và đẹp.)",
        type: "Danh từ",
      },
      {
        id: "3-5",
        word: "방문하다",
        romanized: "bangmunhada",
        vietnamese: "Tham quan",
        example:
          "내일 박물관을 방문할 거예요. (Ngày mai tôi sẽ tham quan bảo tàng.)",
        type: "Động từ",
      },
    ],
  },
  {
    id: "4",
    romanized: "hyeonji eumsik",
    hangul: "현지 음식",
    vietnamese: "Ẩm thực địa phương",
    english: "Local cuisine",
    vocabulary: [
      {
        id: "4-1",
        word: "김치",
        romanized: "kimchi",
        vietnamese: "Kim chi",
        example:
          "김치는 한국의 대표 음식이에요. (Kimchi là món ăn đặc trưng của Hàn Quốc.)",
        type: "Danh từ",
      },
      {
        id: "4-2",
        word: "불고기",
        romanized: "bulgogi",
        vietnamese: "Thịt nướng",
        example: "불고기는 아주 맛있어요. (Thịt nướng rất ngon.)",
        type: "Danh từ",
      },
      {
        id: "4-3",
        word: "비빔밥",
        romanized: "bibimbap",
        vietnamese: "Cơm trộn",
        example: "비빔밥을 먹어 보세요! (Hãy thử ăn cơm trộn đi!)",
        type: "Danh từ",
      },
      {
        id: "4-4",
        word: "먹다",
        romanized: "meokda",
        vietnamese: "Ăn",
        example: "저는 김치를 먹을 수 있어요. (Tôi có thể ăn kim chi.)",
        type: "Động từ",
      },
      {
        id: "4-5",
        word: "맛있다",
        romanized: "masitda",
        vietnamese: "Ngon",
        example: "이 음식은 정말 맛있어요! (Món ăn này thực sự rất ngon!)",
        type: "Tính từ",
      },
    ],
  },
];

const articles: Article[] = [
  {
    id: "1",
    typeArticle: "travel",
    title: "다낭에서 놓칠 수 없는 인기 관광지 TOP 10",
    imagePath: require("@/assets/images/danang.jpg"),
    content:
      "다낭은 웅장한 자연의 아름다움, 유명한 관광지, 그리고 다양한 즐길 거리로 인해 국내외 관광객들에게 이상적인 여행지입니다. 특히 편리한 교통 시스템을 갖춘 푸라마 리조트 다낭은 각 명소를 쉽게 이동하며 탐험할 수 있는 최고의 선택입니다. 다낭에서 가장 아름다운 관광지들을 함께 알아보고, 여러분의 여행이 더욱 완벽해질 수 있도록 준비해보세요!",
    vocabulary: [
      {
        id: "1-1",
        word: "명소",
        romanized: "beoseu",
        vietnamese: "Xe buýt",
        example:
          "버스를 어디에서 탈 수 있나요? (Tôi có thể đón xe buýt ở đâu?)",
        type: "Danh từ",
      },
      {
        id: "1-2",
        word: "다낭",
        romanized: "danang",
        vietnamese: "Tàu hỏa",
        example: "기차를 타고 서울에 가요. (Tôi đi Seoul bằng tàu hỏa.)",
        type: "Danh từ",
      },
      {
        id: "1-3",
        word: "탐험",
        romanized: "bihaenggi",
        vietnamese: "Máy bay",
        example: "비행기로 제주도에 갈 거예요. (Tôi sẽ đi Jeju bằng máy bay.)",
        type: "Danh từ",
      },
    ],
  },
  {
    id: "2",
    typeArticle: "travel",

    title: "Khách sạn và nơi lưu trú tại Hàn Quốc",
    imagePath: require("@/assets/images/danang.jpg"),

    content:
      "Khi du lịch ở Hàn Quốc, bạn sẽ có nhiều lựa chọn về nơi lưu trú. Các khách sạn ở đây rất hiện đại và sạch sẽ. Ngoài khách sạn, bạn còn có thể chọn các dịch vụ phòng cho thuê hoặc căn hộ cho thuê dài hạn.",
    vocabulary: [
      {
        id: "2-1",
        word: "호텔",
        romanized: "hotel",
        vietnamese: "Khách sạn",
        example: "이 호텔은 깨끗해요. (Khách sạn này sạch sẽ.)",
        type: "Danh từ",
      },
      {
        id: "2-2",
        word: "방",
        romanized: "bang",
        vietnamese: "Phòng",
        example: "방이 몇 개 있나요? (Có bao nhiêu phòng?)",
        type: "Danh từ",
      },
      {
        id: "2-4",
        word: "체크인하다",
        romanized: "chekeu-inhada",
        vietnamese: "Nhận phòng",
        example:
          "오후 2시에 체크인할 수 있어요. (Bạn có thể nhận phòng lúc 2 giờ chiều.)",
        type: "Động từ",
      },
    ],
  },
  {
    id: "3",
    typeArticle: "travel",
    title: "Tham quan các địa điểm du lịch nổi tiếng",
    imagePath: require("@/assets/images/danang.jpg"),

    content:
      "Hàn Quốc nổi tiếng với nhiều địa điểm du lịch đẹp và hấp dẫn. Các bạn có thể ghé thăm các cung điện, bảo tàng, và các danh lam thắng cảnh nổi tiếng. Đừng quên tham quan Gyeongbokgung và các ngôi đền truyền thống.",
    vocabulary: [
      {
        id: "3-1",
        word: "명소",
        romanized: "myeongso",
        vietnamese: "Danh lam thắng cảnh",
        example:
          "서울의 명소는 어디인가요? (Địa điểm nổi tiếng ở Seoul là gì?)",
        type: "Danh từ",
      },
      {
        id: "3-3",
        word: "궁전",
        romanized: "gungjeon",
        vietnamese: "Cung điện",
        example:
          "경복궁은 가장 유명한 궁전이에요. (Gyeongbokgung là cung điện nổi tiếng nhất Hàn Quốc.)",
        type: "Danh từ",
      },
      {
        id: "3-5",
        word: "방문하다",
        romanized: "bangmunhada",
        vietnamese: "Tham quan",
        example:
          "내일 박물관을 방문할 거예요. (Ngày mai tôi sẽ tham quan bảo tàng.)",
        type: "Động từ",
      },
    ],
  },
  {
    id: "4",
    typeArticle: "travel",
    title: "Ẩm thực địa phương tại Hàn Quốc",
    imagePath: require("@/assets/images/danang.jpg"),

    content:
      "Ẩm thực Hàn Quốc rất đa dạng và phong phú, từ kimchi đến thịt nướng, cơm trộn, mỗi món ăn đều mang đậm nét văn hóa đặc trưng của đất nước này. Các món ăn này rất ngon và là một phần không thể thiếu trong hành trình khám phá Hàn Quốc.",
    vocabulary: [
      {
        id: "4-1",
        word: "김치",
        romanized: "kimchi",
        vietnamese: "Kim chi",
        example:
          "김치는 한국의 대표 음식이에요. (Kimchi là món ăn đặc trưng của Hàn Quốc.)",
        type: "Danh từ",
      },
      {
        id: "4-3",
        word: "비빔밥",
        romanized: "bibimbap",
        vietnamese: "Cơm trộn",
        example: "비빔밥을 먹어 보세요! (Hãy thử ăn cơm trộn đi!)",
        type: "Danh từ",
      },
      {
        id: "4-4",
        word: "먹다",
        romanized: "meokda",
        vietnamese: "Ăn",
        example: "저는 김치를 먹을 수 있어요. (Tôi có thể ăn kim chi.)",
        type: "Động từ",
      },
    ],
  },
];

export { travelTopics, articles };
