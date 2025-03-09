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
project-name/
│
├── app/                    # Expo Router based navigation
│   ├── (auth)/             # Authentication routes
│   │   ├── login.tsx       # Login screen
│   │   └── register.tsx    # Registration screen
│   ├── (intro)/            # Introduction screens
│   │   ├── intro.tsx       # Main intro screen
│   │   └── splash.tsx      # Initial splash screen
│   ├── (tabs)/             # Main tab navigation
│   │   ├── index.tsx       # Home tab (main screen)
│   │   ├── article.tsx     # Article tab
│   │   ├── conversation.tsx # Conversation tab
│   │   └── video.tsx       # Video tab
│   ├── +html.tsx           # HTML template for web
│   ├── +not-found.tsx      # 404 page
│   └── _layout.tsx         # Root layout with providers
│
├── assets/                 # Static assets
│   ├── fonts/              # Application fonts
│   ├── icons/              # Icon assets
│   └── images/             # Image assets
│
├── components/             # Reusable UI components
│   ├── auth/               # Authentication components
│   ├── common/             # Common shared components
│   ├── home/               # Home screen components
│   ├── icons/              # SVG icon components
│   └── intro/              # Intro screen components
│
├── configs/                # Configuration files
│   └── db.ts               # Supabase connection config
│
├── constants/              # App-wide constants
│   ├── Assets.ts           # Asset path references
│   ├── Colors.ts           # Color theme definitions
│   └── Fonts.ts            # Font configurations
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts          # Authentication context hook
│   ├── useColorScheme.ts   # Color scheme detection hook
│   └── useThemeColor.ts    # Theme color utility
│
├── navigation/             # Navigation components
│   ├── AppNavigator.tsx    # Main app navigation stack
│   ├── AuthNavigator.tsx   # Auth flow navigation stack
│   └── IntroNavigator.tsx  # Intro screens navigation stack
│
├── providers/              # Context providers
│   └── AuthProvider.tsx    # Authentication context provider
│
├── screens/                # Screen implementations
│   ├── auth/               # Auth screens
│   ├── home/               # Home screens
│   └── Intro/              # Intro screens
│
├── supabase/               # Supabase configuration
│   └── migrations/         # Database migration files
│
├── types/                  # TypeScript type definitions
│   └── supabase.ts         # Supabase database types
│
└── utils/                  # Utility functions
    └── supabase.ts         # Supabase client configuration
```
