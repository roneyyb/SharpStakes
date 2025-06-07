# SharpStakes - Sports Predictions App

A React Native mobile application that allows sports fans to view upcoming games, track live scores, and make predictions on game outcomes. Built with a focus on clean architecture and iOS-first user experience.

## Project Architecture

### Navigation System

The app utilizes a robust navigation system built with React Navigation, featuring:

- **Type-Safe Navigation**: Fully typed navigation parameters using TypeScript for better developer experience and type safety
- **Stack Navigation**: Hierarchical navigation with smooth transitions between screens
- **Global Navigation Keys**: Centralized navigation keys for type-safe navigation from anywhere in the app
- **Screen Configuration**: Declarative screen configuration with consistent options and theming

### Global State Management

- **Context API**: Used for global state management with a focus on performance and simplicity
- **Theme Provider**: Centralized theming system supporting light/dark modes and custom theming
- **User Context**: Global user state management for authentication and user preferences

### Code Organization

- **Feature-Based Structure**: Organized by features for better maintainability and scalability
- **Reusable Components**: Shared UI components in the components directory
- **Custom Hooks**: Encapsulated logic in custom hooks for reusability
- **API Layer**: Centralized API calls with React Query for data fetching and caching


## Features

### Games Dashboard
- View list of upcoming, live, and completed games
- Filter games by status (upcoming, in-progress, completed)
- Display essential game information and odds
- Clean, intuitive UI with smooth navigation

### Game Detail Screen
- Detailed view of selected game
- Team information, records, and current score (for live games)
- Simple prediction interface to pick winners or against the spread
- Real-time score updates

### User Profile
- Track prediction history
- View win/loss record
- Monitor virtual balance
- See pending and settled predictions

## Tech Stack

- **Frontend**: React Native (iOS-focused)
- **State Management**: React Context API for theme, user details
- **Navigation**: React Navigation
- **Styling**: React Native StyleSheet
- **Data Fetching**: Axios, React Query for caching, Hooks for polling
- **Local Storage**: react-native-mmkv
- **Mock Server**: JSON Server

## Libraries Used

### Core
- **React Native (0.79.3)**: Core framework for building cross-platform mobile apps
- **React (19.0.0)**: JavaScript library for building user interfaces

### Navigation
- **@react-navigation/native (7.1.10)**: Routing and navigation for React Native apps
- **@react-navigation/native-stack (7.3.14)**: Stack navigator implementation

### State Management & Data Fetching
- **React Context API**: For global state management (theme, user data)
- **react-query (3.39.3)**: Data fetching and caching
- **axios (1.9.0)**: HTTP client for API requests

### Storage
- **react-native-mmkv (3.2.0)**: Fast key-value storage for offline data persistence

### Animation & UI
- **react-native-reanimated (3.18.0)**: High-performance animations
- **react-native-gesture-handler (2.25.0)**: Native gestures and touch handling
- **react-native-svg (15.12.0)**: SVG support for custom icons and graphics

### Utilities
- **moment (2.30.1)**: Date and time manipulation
- **react-native-safe-area-context (5.4.1)**: Safe area insets handling
- **react-native-screens (4.11.1)**: Native navigation container

### Development Tools
- **TypeScript**: Type checking and better developer experience
- **JSON Server**: Mock API server for development

## Prerequisites

- Node.js (v14 or later)
- npm or Yarn
- Xcode 13 or newer (including command line tools)
- CocoaPods (for iOS dependencies)
- React Native development environment
  - Follow the [iOS setup guide](https://reactnative.dev/docs/environment-setup?os=macos&platform=ios&guide=native) to set up your environment

## Project Structure

```
src/
├── api/               # API service and mock data
├── assets/            # Images, fonts, and other static assets
├── components/        # Reusable UI components
│   ├── animation/     # Custom animation components and helpers
│   ├── button/        # Button components with various styles
│   ├── checkbox/      # Custom checkbox components
│   ├── dot/           # Dot indicators and separators
│   ├── header/        # Header components
│   ├── input/         # Form input components
│   └── text/          # Typography components
├── constants/         # App-wide constants and enums
├── context/           # React context providers for global state
│   └── theme/         # Theme provider and styling context
├── navigation/        # Navigation configuration and stack navigators
├── screens/           # App screens
│   ├── games/         # Games related screens
│   │   ├── game-details/  # Game detail screen components
│   │   └── games-list/    # Games list and dashboard components
│   └── profile/       # User profile screen components
└── utils/             # Utility functions and helpers
    ├── axios.ts       # Axios instance and API configuration
    ├── queryClient.ts # React Query client configuration
    ├── storage.ts     # Local storage utilities
    ├── theme.tsx      # Theme configuration and theming utilities
    ├── user.tsx       # User-related utility functions
    └── warnings.js    # Warning handlers and utilities
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn
- Xcode 13 or newer (including command line tools)
- CocoaPods (for iOS dependencies)
- React Native development environment
  - Follow the [iOS setup guide](https://reactnative.dev/docs/environment-setup?os=macos&platform=ios&guide=native) to set up your environment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/roneyyb/sharpstakes.git
   cd sharpstakes
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # OR using Yarn
   yarn install
   ```

3. **Install iOS dependencies**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the App

You'll need to run two separate processes: the React Native development server and the mock API server.

#### 1. Start the Mock API Server

In a new terminal window, run:

```bash
# Using npm
npm run mock-server

# OR using Yarn
yarn mock-server
```

This will start the JSON Server on `http://localhost:3001` with the mock data.

#### 2. Start the React Native Development Server

In a new terminal window, run:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

This will start the Metro bundler. You can press:
- `i` to open the iOS simulator
- `r` to reload the app
- `d` to open the developer menu

#### 3. Run on iOS

In a new terminal window (after starting both servers), run:

```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

This will build and launch the app in the iOS Simulator.

### Development Workflow

- The app will automatically reload if you make changes to the code
- For native changes, you may need to rebuild the app
- The mock server will automatically reload when you make changes to `mock-data.json`

## Mock API Endpoints

The app uses a simple JSON Server for mock data:

- `GET /games` - Get all games
- `GET /games/:id` - Get game details
- `POST /predictions` - Submit a new prediction
- `GET /user` - Get user profile and prediction history

## Development Notes

- The app uses a polling mechanism to update game statuses every 10 seconds
- Predictions are stored locally using storage
- The UI is optimized for iOS with platform-specific components and styling

## AI Assistance

This project was developed with the assistance of AI tools for:
- Basic design guidance then further improved myself
- Code completion and biolerplate generation where ever needed
- Documentation assistance
- Automating repetitive tasks to improve development efficiency

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This is a demo application created for assessment purposes. All team and game data is fictional.

## Running the App

1. **Start Metro**
   ```bash
   # Using npm
   npm start
   
   # OR using Yarn
   yarn start
   ```
   
   Keep Metro running in its own terminal.

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

2. **Run on iOS**
   ```bash
   # In a new terminal
   npm run ios
   # or
   yarn ios
   ```
   
   This will build and launch the app in the iOS Simulator.

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
