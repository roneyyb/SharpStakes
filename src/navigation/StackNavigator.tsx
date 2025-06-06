/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GamesListScreen from '@/screens/games/games-list';
import GameDetailsScreen from '@/screens/games/game-details';
import ProfileScreen from '@/screens/profile';
import { useTheme } from '@/utils/theme';
import { View } from 'react-native';

export type RootStackParamList = {
    GamesList: undefined;
    GameDetails: { id: string };
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ScreenNames = {
    GamesList: 'GamesList',
    GameDetails: 'GameDetails',
    Profile: 'Profile',
} as const;


const screens = [
    {
        name: ScreenNames.GamesList,
        component: GamesListScreen,
        options: { title: 'Games List', headerShown: false },
    },
    {
        name: ScreenNames.GameDetails,
        component: GameDetailsScreen,
        options: { title: 'Game Details', headerShown: false },
    },
    {
        name: ScreenNames.Profile,
        component: ProfileScreen,
        options: { title: 'Profile', headerShown: false },
    },
];

const StackNavigator = () => {

    const theme = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={ScreenNames.GamesList}>
                    {screens.map(screen => (
                        <Stack.Screen
                            key={screen.name}
                            name={screen.name as keyof RootStackParamList}
                            component={screen.component}
                            options={screen.options}
                        />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default StackNavigator;
