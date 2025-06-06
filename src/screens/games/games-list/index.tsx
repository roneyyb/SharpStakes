import StatusBarHoc from '@/hoc/StatusBarHoc';
import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useGames } from '@/api/games';

const GamesListScreen = () => {
    const { data: games, isLoading, error } = useGames();

    console.log("DATA", games, isLoading, error);

    return (
        <StatusBarHoc>
            <View style={{ flex: 1, padding: 16 }}>
                {isLoading && <ActivityIndicator size="large" />}
                {error && <Text>Error loading games.</Text>}
                {!isLoading && !error && (
                    <FlatList
                        data={games}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ paddingVertical: 8 }}>
                                <Text style={{ fontSize: 18 }}>{item.homeTeam.name}</Text>
                                <Text style={{ color: '#666' }}>{item.awayTeam.name}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </StatusBarHoc>
    );
};

export default GamesListScreen;