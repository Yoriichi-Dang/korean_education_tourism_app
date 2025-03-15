interface Vocabulary {
  id: string;
  word: string;
  romanized: string;
  vietnamese: string;
  example: string;
  type: TypeWord;
}

interface TravelTopic {
  id: string;
  romanized: string;
  hangul: string;
  vietnamese: string;
  english: string;
  vocabulary: Vocabulary[];
}
type TypeWord =
  | "Động từ"
  | "Danh từ"
  | "Tính từ"
  | "Phó từ"
  | "Liên từ"
  | "Giới từ"
  | "Thán từ"
  | "Số từ"
  | "Trạng từ"
  | "Thể từ";

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
export { travelTopics };
