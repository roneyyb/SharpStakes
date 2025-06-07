import { Game } from '@/api/games';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import moment from "moment";
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
// BlinkingDot animates opacity for a blinking effect
import DotBlinking from '@/components/dot/DotBlinking';

interface GameOdsCardProps {
    game: Game;
    onPress?: () => void;
}

const GameSchedule = ({ game, onPress }: GameOdsCardProps) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.cardBackground, padding: 16, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }}
        >
            <WrappedText
                text={game.status === "inProgress" ? "IN PROGRESS" : game.status == "final" ? "COMPLETED" : "SCHEDULED"}
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={20}
                textStyle={{ textAlign: "center" }}

            />

            {game.status != "inProgress" && <DotBlinking color={colors.accent} />}


            <WrappedText
                text={
                    game.status === "inProgress"
                        ? game.period + " " + game.clock
                        : game.startTime
                            ? moment(game.startTime).format("ddd, MMM D, YYYY [at] h:mm A")
                            : ""
                }
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={12}
                textStyle={{ textAlign: "center" }}
            />
        </TouchableOpacity>
    );

}



export default GameSchedule