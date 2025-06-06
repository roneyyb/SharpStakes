import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Game } from '@/api/games';
import { useTheme } from '@/utils/theme';

interface GameListCardProps {
    game: Game;
    onPress?: () => void;
    showButton?: boolean
    showFullName?: boolean
}

const GameListCard = ({ game, onPress, showButton, showFullName }: GameListCardProps) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{ backgroundColor: colors.cardBackground, padding: 16, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }}
        >
            {game.status === 'final' && <WrappedText
                text={game.status === 'final' ? game.winner + " won the game" : ''}
                textStyle={{ textTransform: "uppercase", textAlign: "center" }}
                textColor={colors.accent}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={12}
            />}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: game.winner ? 10 : 0 }}>
                <View style={{ rowGap: 10 }}>
                    <WrappedText text={game.homeTeam.abbreviation + (game.homeTeam.score ? " (" + game.homeTeam.score + ")" : "")} textColor={colors.text} fontFamily={FontsWithWeight.circular_700} fontSize={game.homeTeam.score ? 25 : 40} />
                    <WrappedText text={game.homeTeam.record} textColor={colors.text} fontFamily={FontsWithWeight.circular_700} fontSize={20} />
                </View>
                <Text style={{ color: colors.text }}>VS</Text>
                <View style={{ rowGap: 10 }}>
                    <WrappedText text={game.awayTeam.abbreviation + (game.awayTeam.score ? " (" + game.awayTeam.score + ")" : "")} textColor={colors.text} fontFamily={FontsWithWeight.circular_700} fontSize={game.awayTeam.score ? 25 : 40} />
                    <WrappedText text={game.awayTeam.record} textColor={colors.text} fontFamily={FontsWithWeight.circular_700} fontSize={20} />
                </View>
            </View>

            {(game.status === "inProgress" || game.status === "scheduled") && showButton &&
                <ButtonPressableWithText
                    textProps={{
                        text: game.status == "inProgress" ? "MAKE PREDICITON" : "CHECK DETAILS",
                        textColor: colors.text,
                        fontFamily: FontsWithWeight.circular_700,
                        fontSize: 16,

                    }}
                    onPress={async () => {
                        try {
                            onPress && onPress()

                            // await addItem(StorageKeys.userPredictionDetails, { gameId: game.id, pick: selectedPick, amount: amount })
                        } catch (error) {
                            console.log("error", error)
                        }
                    }}
                    containerStyle={{ width: "100%", marginTop: 20, height: 50, borderRadius: 10, borderColor: colors.accent, borderWidth: 1, alignItems: "center", justifyContent: "center" }}
                />}
        </TouchableOpacity>
    );
};

import { StyleSheet } from 'react-native';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import ButtonPressableWithText from '@/components/button/ButtonPressableWithText';

const styles = StyleSheet.create({
    centeredRecord: {
        textAlign: 'center',
        fontSize: 20,
    },
});

export default GameListCard