import { UserPrediction } from '@/api/user';
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useGame } from '@/api/games';
import { useTheme } from '@/utils/theme';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';

const PredictedGameDetailCard = ({ prediction }: { prediction: UserPrediction }) => {
    const { data: game, isLoading, error } = useGame(prediction.gameId);
    const { colors } = useTheme();

    if (isLoading) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}> 
                <ActivityIndicator size="small" />
            </View>
        );
    }

    if (error || !game) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}> 
                <Text style={{ color: colors.text }}>Game not found.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}> 
            <WrappedText text={`${game.homeTeam.abbreviation} vs ${game.awayTeam.abbreviation}`} textColor={colors.text} fontFamily={FontsWithWeight.circular_900} fontSize={20} />
            <Text style={{ color: colors.text }}>Your Pick: {prediction.pick}</Text>
            <Text style={{ color: colors.text }}>Amount: {prediction.amount}</Text>
            <Text style={{ color: colors.text }}>Result: {prediction.result}</Text>
            {typeof prediction.payout === 'number' && (
                <Text style={{ color: colors.text }}>Payout: {prediction.payout}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 80,
        borderRadius: 12,
        marginVertical: 8,
    },
});

export default PredictedGameDetailCard;