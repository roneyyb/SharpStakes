import { Dimensions, Platform, StatusBar } from 'react-native';

// Screen dimensions
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Status bar height
export const STATUSBAR_HEIGHT = Platform.select({
    ios: 20,
    android: StatusBar.currentHeight || 0,
    default: 0,
});

// You can add more constants as needed, e.g. navigation bar height, header height, etc.
