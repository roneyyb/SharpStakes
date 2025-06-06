import StatusBarHoc from '@/hoc/StatusBarHoc';
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useGames } from '@/api/games';
import GameFlatList from './views/GameFlatList';
import GameFilter from '../component/GameFilter';

const GamesListScreen = () => {
    const { data: games, isLoading, error } = useGames();

    const [filter, setFilter] = React.useState<'scheduled' | 'inProgress' | 'final'>('scheduled');

    console.log("DATA", games, isLoading, error);

    return (
        <StatusBarHoc>
            <View style={{ flex: 1, padding: 16 }}>
                {isLoading && <ActivityIndicator size="large" />}
                {error && <Text>Error loading games.</Text>}
                <GameFilter onFilterChange={setFilter} />
                {!isLoading && !error && (
                    <GameFlatList games={games || []} />
                )}
            </View>
        </StatusBarHoc>
    );
};

export default GamesListScreen;