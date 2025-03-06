# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Project structure

```bash
my-app/
│
├── assets/
│   ├── fonts/                # Tất cả các font tùy chỉnh của ứng dụng
│   ├── images/               # Tất cả hình ảnh, biểu tượng, tài nguyên hình ảnh khác
│   └── icons/                # Biểu tượng ứng dụng
│
├── components/               # Chứa các component tái sử dụng trong ứng dụng
│   ├── Button.js
│   ├── Header.js
│   └── CustomText.js
│
├── constants/                # Các hằng số, giá trị, thiết lập chung của ứng dụng
│   ├── Colors.js
│   ├── Fonts.js
│   └── Dimensions.js
│
├── hooks/                    # Chứa các custom hooks
│   ├── useColorScheme.js
│   └── useAuth.js
│
├── navigation/               # Cấu trúc điều hướng ứng dụng
│   ├── AppNavigator.js
│   └── BottomTabNavigator.js
│
├── screens/                  # Các màn hình (screens) chính trong ứng dụng
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
│
├── services/                 # Các API services hoặc business logic
│   ├── api.js
│   └── authService.js
│
├── App.js                    # File entry point chính của ứng dụng
├── app.json                  # File cấu hình của Expo
├── babel.config.js           # File cấu hình của Babel
├── package.json              # File quản lý các package của dự án
├── metro.config.js           # Cấu hình của Metro bundler
└── .gitignore                # Các file và thư mục cần bỏ qua khi dùng Git

```
