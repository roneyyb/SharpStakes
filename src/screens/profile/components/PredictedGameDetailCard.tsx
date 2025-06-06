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
        <View style={[styles.card, { backgroundColor: colors.cardBackground, rowGap: 5 }, { backgroundColor: colors.cardBackground, padding: 16, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <WrappedText text={`${game.homeTeam.abbreviation} vs ${game.awayTeam.abbreviation}`}
                    textColor={colors.text} fontFamily={FontsWithWeight.circular_900}
                    fontSize={35}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>

                <WrappedText text={`Your Pick: ${prediction.pick}`} textColor={colors.text} fontFamily={FontsWithWeight.circular_450} fontSize={20} />
                <WrappedText text={`Invested: ${prediction.amount}`} textColor={colors.text} fontFamily={FontsWithWeight.circular_450} fontSize={20} />

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {typeof prediction.payout === 'number' ? (
                    <WrappedText text={`Payout Done: ${prediction.payout}`} textColor={colors.text} fontFamily={FontsWithWeight.circular_450} fontSize={20} />
                ) : <View />}
                <WrappedText text={`Result: ${prediction.result}`} textColor={prediction.result === 'win' ? colors.win : colors.loss} fontFamily={FontsWithWeight.circular_450} fontSize={20} />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 20,
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