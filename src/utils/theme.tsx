import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

const lightColors = {
    background: '#F9F9F9',
    cardBackground: '#FFFFFF',
    text: '#111111',
    sectionTitle: '#222222',
    sectionDescription: '#666666',
    divider: '#E0E0E0',

    // Tab Bar
    tabBarBackground: '#FFFFFF',
    tabBarBorderTop: '#E0E0E0',
    tabBarIconActive: '#1ED760',
    tabBarIconInactive: '#999999',
    tabBarLabelActive: '#1ED760',
    tabBarLabelInactive: '#999999',

    // Filters
    filterBackground: '#F0F0F0',
    filterActiveBackground: '#1ED760',
    filterText: '#444444',
    filterActiveText: '#000000',
    filterBorder: '#DDDDDD',

    // Status Colors
    win: '#2E8B57',
    loss: '#C62828',
    pending: '#FFA500',

    // Accent / Button
    accent: '#1ED760',
};
const darkColors = {
    background: '#121212',
    cardBackground: '#1E1E1E',
    text: '#FFFFFF',
    sectionTitle: '#EEEEEE',
    sectionDescription: '#A0A0A0',
    divider: '#2A2A2A',

    // Tab Bar
    tabBarBackground: '#1E1E1E',
    tabBarBorderTop: '#2A2A2A',
    tabBarIconActive: '#1ED760',
    tabBarIconInactive: '#666666',
    tabBarLabelActive: '#1ED760',
    tabBarLabelInactive: '#666666',

    // Filters
    filterBackground: '#2C2C2C',
    filterActiveBackground: '#1ED760',
    filterText: '#AAAAAA',
    filterActiveText: '#ffffff',
    filterBorder: '#444444',

    // Status Colors
    win: '#FFD700',
    loss: '#FF4C4C',
    pending: '#FFA500',

    // Accent / Button
    accent: '#1ED760',
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