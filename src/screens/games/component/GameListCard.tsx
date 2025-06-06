import React from 'react';
import { Text, View } from 'react-native';
import { Game } from '@/api/games';
import { useTheme } from '@/utils/theme';

const GameListCard = ({ game }: { game: Game }) => {

    const { colors } = useTheme()

    return (
        <View style={{ backgroundColor: colors.cardBackground, padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ color: colors.text }}>{game.homeTeam.name}</Text>
            <Text style={{ color: colors.text }}>{game.awayTeam.name}</Text>
        </View>
    );
};

export default GameListCard;