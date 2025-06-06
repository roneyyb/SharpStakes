import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Game } from '@/api/games';
import { useTheme } from '@/utils/theme';

interface GameOdsCardProps {
    game: Game;
    onPress?: () => void;
}

const GameOdsCard = ({ game, onPress }: GameOdsCardProps) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{ backgroundColor: colors.cardBackground, padding: 16, marginHorizontal: 5, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 4px #ffffff66', elevation: 10 }}
        >
            <WrappedText
                text='GAME ODDS'
                textColor={colors.text}
                fontFamily={FontsWithWeight.circular_900}
                fontSize={24}
                textStyle={{ textAlign: "center" }}

            />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignItems: "center", marginTop: 15, marginHorizontal: 20, marginBottom: 10 }}>


                <View style={{ rowGap: 10 }}>
                    <WrappedText
                        text={game.odds.spread}
                        textColor={colors.accent}
                        fontFamily={FontsWithWeight.circular_700}
                        fontSize={20}

                    />
                    <WrappedText
                        text={"Spread"}
                        textColor={colors.text}
                        fontFamily={FontsWithWeight.circular_700}
                        fontSize={20}

                    />
                </View>

                <View style={{ rowGap: 10 }}>
                    <WrappedText
                        text={"Favorite"}
                        textColor={colors.text}
                        fontFamily={FontsWithWeight.circular_700}
                        fontSize={20}

                    />
                    <WrappedText
                        text={game.odds.favorite}
                        textColor={colors.accent}
                        fontFamily={FontsWithWeight.circular_700}
                        fontSize={20}

                    />

                </View>
            </View>

        </TouchableOpacity>
    );
};

import { StyleSheet } from 'react-native';
import WrappedText, { FontsWithWeight } from '@/components/text/WrappedText';

const styles = StyleSheet.create({
    centeredRecord: {
        textAlign: 'center',
        fontSize: 20,
    },
});

export default GameOdsCard