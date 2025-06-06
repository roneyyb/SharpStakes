import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Game } from '@/api/games';
import { useTheme } from '@/utils/theme';

interface GameListCardProps {
    game: Game;
    onPress?: () => void;
}

const GameListCard = ({ game, onPress }: GameListCardProps) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.cardBackground, padding: 16, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }}
        >
            <View>
                <Text style={{ color: colors.text, fontSize: 40, fontWeight: "bold" }}>{game.homeTeam.abbreviation}</Text>
                <Text style={[styles.centeredRecord, { color: colors.text }]}>{game.homeTeam.record}</Text>
            </View>
            <Text style={{ color: colors.text }}>VS</Text>
            <View>
                <Text style={{ color: colors.text, fontSize: 40, fontWeight: "bold" }}>{game.awayTeam.abbreviation}</Text>
                <Text style={[styles.centeredRecord, { color: colors.text }]}>{game.awayTeam.record}</Text>
            </View>


        </TouchableOpacity>
    );
};

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredRecord: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default GameListCard