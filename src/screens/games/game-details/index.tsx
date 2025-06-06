import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGame } from '@/api/games';

type RouteParams = { id: string };

const GameDetailsScreen = () => {
    const route = useRoute();
    // @ts-ignore
    const { id } = route.params as RouteParams;
    const { data: game, isLoading, error } = useGame(id);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !game) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error loading game details.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{game.title}</Text>
            <Text style={{ marginVertical: 8 }}>{game.description}</Text>
            <Text style={{ color: '#666' }}>{game.date}</Text>
        </View>
    );
};

export default GameDetailsScreen;