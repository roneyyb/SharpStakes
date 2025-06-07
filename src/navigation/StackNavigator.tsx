/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GamesListScreen from '@/screens/games/games-list';
import GameDetailsScreen from '@/screens/games/game-details';
import ProfileScreen from '@/screens/profile';
import { useTheme } from '@/utils/theme';
import { View } from 'react-native';
import { useUser } from '@/api/user';
import { useUserDetails } from '@/utils/user';

export type RootStackParamList = {
    GamesList: undefined;
    GameDetails: { id: string };
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Configure screen options for bottom-to-top animation
const screenOptions = {
    animation: 'slide_from_right',
    headerShown: false,
};

export const ScreenNames = {
    GamesList: 'GamesList',
    GameDetails: 'GameDetails',
    Profile: 'Profile',
} as const;


const screens = [
    {
        name: ScreenNames.GamesList,
        component: GamesListScreen,
        options: { title: 'Games List' },
    },
    {
        name: ScreenNames.GameDetails,
        component: GameDetailsScreen,
        options: { title: 'Game Details' },
    },
    {
        name: ScreenNames.Profile,
        component: ProfileScreen,
        options: { title: 'Profile', animation: "slide_from_left" },
    },
];

const StackNavigator = () => {

    const theme = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        ...screenOptions,
                        contentStyle: { backgroundColor: theme.colors.background },
                    }}
                    initialRouteName={ScreenNames.GamesList}
                >
                    {screens.map((screen) => (
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
