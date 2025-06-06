import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGame } from '@/api/games';
import { useTheme } from '@/utils/theme';
import StatusBarHoc from '@/hoc/StatusBarHoc';

type RouteParams = { id: string };

const GameDetailsScreen = () => {
    const route = useRoute();
    // @ts-ignore
    const { id } = route.params as RouteParams;
    const { data: game, isLoading, error } = useGame(id);
    const { colors } = useTheme()

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
        <StatusBarHoc>

            <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{game.homeTeam.name} vs {game.awayTeam.name}</Text>
                <Text style={{ marginVertical: 8 }}>Status: {game.status}</Text>
                {game.period && <Text>Period: {game.period}</Text>}
                {game.clock && <Text>Clock: {game.clock}</Text>}
                <Text>Home Score: {game.homeTeam.score ?? '-'}</Text>
                <Text>Away Score: {game.awayTeam.score ?? '-'}</Text>
                {game.winner && <Text>Winner: {game.winner}</Text>}
                <Text style={{ marginTop: 8 }}>
                    Odds: {game.odds.spread} | Favorite: {game.odds.favorite}
                </Text>
            </View>
        </StatusBarHoc>
    );
};

export default GameDetailsScreen;