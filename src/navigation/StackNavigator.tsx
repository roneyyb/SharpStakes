import GameDetailsScreen from '@/screens/games/game-details';
import GamesListScreen from '@/screens/games/games-list';
import ProfileScreen from '@/screens/profile';
import { useTheme } from '@/utils/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export type RootStackParamList = {
    GamesList: undefined;
    GameDetails: { id: string };
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Configure screen options
const screenOptions: NativeStackNavigationOptions = {
    animation: 'slide_from_right' as const,
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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } as ViewStyle,
});

export default StackNavigator;
