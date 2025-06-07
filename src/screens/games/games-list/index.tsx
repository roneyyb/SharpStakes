import StatusBarHoc from '@/hoc/StatusBarHoc';
import React from 'react';
import {
    View,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useGames } from '@/api/games';


import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenNames } from '@/navigation/StackNavigator';
import GameFlatList from './views/GameFlatList';
import GameFilter from './component/GameFilter';
import GameListHeader from './component/GameListHeader';
import { RefreshControl } from 'react-native-gesture-handler';
import { useTheme } from '@/utils/theme';
import WrappedText from '@/components/text/WrappedText';

interface GamesListStyles {
    container: ViewStyle;
    loadingContainer: ViewStyle;
    contentContainer: ViewStyle;
    scrollView: ViewStyle;
}

type GameStatus = 'scheduled' | 'inProgress' | 'final';

type RootStackParamList = {
    GameDetails: { id: string };
    Profile: undefined;
    GamesList: undefined;
};

const GamesListScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { data: games, isLoading, error, refetch } = useGames();
    const [filter, setFilter] = React.useState<GameStatus>('scheduled');
    const { colors } = useTheme();

    const styles = StyleSheet.create<GamesListStyles>({
        container: {
            flex: 1,
            paddingHorizontal: '5%',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentContainer: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
        },
    });

    const handleGamePress = (game: any) => {
        navigation.navigate(ScreenNames.GameDetails, { id: game.id });
    };

    const handleRefresh = () => {
        refetch();
    };

    const handleProfilePress = () => {
        navigation.navigate(ScreenNames.Profile);
    };

    return (
        <StatusBarHoc>
            <View style={styles.container}>
                <GameListHeader onPressProfile={handleProfilePress} />

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.text} />
                    </View>
                ) : error ? (
                    <WrappedText text="Error loading games." textColor="error" />
                ) : null}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            colors={[colors.text]}
                            refreshing={isLoading}
                            onRefresh={handleRefresh}
                        />
                    }>
                    {!isLoading && !error && (
                        <>
                            <GameFilter onFilterChange={setFilter} />
                            <GameFlatList 
                                games={games?.filter((game) => game.status === filter) || []}
                                onPress={handleGamePress}
                            />
                        </>
                    )}
                </ScrollView>
            </View>
        </StatusBarHoc>
    );
};

export default GamesListScreen;