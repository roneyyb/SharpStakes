import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

const lightColors = {
    background: '#F9F9F9',          // Light grayish white for overall app bg
    text: '#111111',                // Rich black for primary text
    sectionTitle: '#222222',        // Slightly lighter than text
    sectionDescription: '#666666',  // Muted gray for helper or secondary text
    cardBackground: '#FFFFFF',      // Pure white for cards
    accent: '#1ED760',              // Green for buttons/highlights
    win: '#2E8B57',                 // Greenish for win tags
    loss: '#C62828',                // Red for loss tags
    pending: '#FFA500',             // Orange for pending
    divider: '#E0E0E0',             // Light gray for lines
};

const darkColors = {
    background: '#121212',          // Deep black for app background
    text: '#FFFFFF',                // Bright white for primary text
    sectionTitle: '#EEEEEE',        // Slightly dimmed white
    sectionDescription: '#A0A0A0',  // Dim gray for secondary text
    cardBackground: '#1E1E1E',      // Dark gray card surfaces
    accent: '#1ED760',              // Green for action buttons
    win: '#FFD700',                 // Gold for win tags
    loss: '#FF4C4C',                // Red for loss tags
    pending: '#FFA500',             // Orange for pending
    divider: '#2A2A2A',             // Subtle divider color
};

const ThemeContext = createContext({
    theme: 'light' as ThemeType,
    colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderSS: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scheme = useColorScheme();
    const theme = !(scheme === 'dark') ? 'dark' : 'light';
    const colors = useMemo(() => (theme === 'dark' ? darkColors : lightColors), [theme]);
    return (
        <ThemeContext.Provider value={{ theme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}