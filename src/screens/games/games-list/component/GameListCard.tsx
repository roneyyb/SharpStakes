import { Game } from '@/api/games';
import ButtonPressableWithText from '@/components/button/ButtonPressableWithText';
import DotBlinking from '@/components/dot/DotBlinking';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import { useGameScorePolling } from '@/hook/useGameScorePolling';
import { useTheme } from '@/utils/theme';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TeamInfo from './TeamInfo';


interface GameListCardProps {
    game: Game;
    onPress?: () => void;
    showButton?: boolean
    showFullName?: boolean
}

const GameListCard = ({ game: initialGame, onPress, showButton, showFullName }: GameListCardProps) => {
    const { colors } = useTheme();
    const { game, isLoading } = useGameScorePolling(initialGame);
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{ backgroundColor: colors.cardBackground, padding: 20, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }}
        >
            {game.status === "inProgress" &&
                <View style={{ paddingBottom: 10 }}>
                    <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}>
                        <DotBlinking color={colors.accent} />
                        <WrappedText text='Live Score' fontSize={12} textColor={colors.text} />
                    </View>
                </View>}


            {game.status !== 'inProgress' && <WrappedText
                text={game.status == "scheduled" ? "Game scheduled at " + moment(game.startTime).format("ddd, MMM D, YYYY [at] h:mm A") : game.status === 'final' ? game.winner + " won the game" : ''}
                textStyle={{ textTransform: "uppercase", marginBottom: 10 }}
                textColor={colors.accent}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={game.status == "scheduled" ? 10 : 12}

            />}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TeamInfo
                    team={{
                        abbreviation: game.homeTeam.abbreviation,
                        score: game.homeTeam.score,
                        record: game.homeTeam.record,
                    }}
                    textColor={colors.text}
                />
                <WrappedText
                    text="VS"
                    textColor={colors.text}
                    fontFamily={FontsWithWeight.circular_450}
                    fontSize={20}
                />
                <TeamInfo
                    team={{
                        abbreviation: game.awayTeam.abbreviation,
                        score: game.awayTeam.score,
                        record: game.awayTeam.record,
                    }}
                    textColor={colors.text}
                />
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


export default GameListCard