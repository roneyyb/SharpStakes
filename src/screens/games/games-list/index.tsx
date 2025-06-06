import StatusBarHoc from '@/hoc/StatusBarHoc';
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useGames } from '@/api/games';


import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '@/navigation/StackNavigator';
import GameFlatList from './views/GameFlatList';
import GameFilter from './component/GameFilter';
import GameListHeader from './component/GameListHeader';

const GamesListScreen = () => {
    const { data: games, isLoading, error } = useGames();
    const navigation = useNavigation();
    const [filter, setFilter] = React.useState<'scheduled' | 'inProgress' | 'final'>('scheduled');

    const handleGamePress = (game: any) => {
        navigation.navigate(ScreenNames.GameDetails, { id: game.id });
    };

    console.log("DATA", games, isLoading, error);

    return (
        <StatusBarHoc>

            <View style={{ flex: 1, paddingHorizontal: "5%" }}>
                <GameListHeader onPressProfile={() => { navigation.navigate(ScreenNames.Profile) }} />
                {isLoading && <ActivityIndicator size="large" />}
                {error && <Text>Error loading games.</Text>}
                <GameFilter onFilterChange={setFilter} />
                {!isLoading && !error && (
                    <GameFlatList games={games?.filter((game) => game.status === filter) || []} onPress={handleGamePress} />
                )}
            </View>
        </StatusBarHoc>
    );
};

export default GamesListScreen;