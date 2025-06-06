import { Game } from '@/api/games';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';
import { useTheme } from '@/utils/theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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
                text={game.status}
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={20}
                textStyle={{ textAlign: "center" }}

            />
            <View style={{ height: 10, width: 10, borderRadius: 20, backgroundColor: colors.accent }} />

            <WrappedText
                text={new Date(game.startTime).toLocaleString()}
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_700}
                fontSize={20}
                textStyle={{ textAlign: "center" }}

            />
        </TouchableOpacity>
    );

}



export default GameSchedule